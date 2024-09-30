from rest_framework.response import Response
from .serializers import UserSerializer, Store, StoresSerializer, ItemsAvaliableSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Q

class User(APIView):
    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]
    
    def post(self, request):
        try:
            user_type = request.data.get('type', None)

            #checks if the user is authenticated
            if request.user.is_authenticated:
                #check if you are admin
                if request.user.type == 'admin':
                    #check if you are trying to register a client or superuser
                    if user_type != 'client' and user_type != 'sudo':
                        serializer = UserSerializer(data=request.data)
                        if serializer.is_valid():
                            serializer.save()
                            return Response({'status': 'User created successfully'}, status=status.HTTP_201_CREATED)
                        else:
                            return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                    #if so, it returns permission error
                    else:
                        return Response({'error': 'Admins cannot create sudo or client users'}, status=status.HTTP_403_FORBIDDEN)
                #if you are not admin
                elif request.user.type == 'sudo':
                    serializer = UserSerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response({'status': 'User created successfully'}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': 'User not authorized to create new users'}, status=status.HTTP_403_FORBIDDEN)
            
            #if the user is not authenticated
            else:
                #check if it is a client type
                if user_type == 'client':
                    serializer = UserSerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response({'status': 'User created successfully'}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                #if it is not, you cannot register
                else:
                    return Response({'error': 'Only customers can be registered without authentication'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({'error': f'Error creating user: {e}'}, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        try:
            return Response({'language': request.user.language, 'name': request.user.name, 'type': request.user.type}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': f"Ocorreu um erro ao buscar o usuário: {e}"}, status=status.HTTP_200_OK)


class Stores(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            #checks the existence of filters
            if request.GET.dict():
                try:
                    filters = request.GET.dict()
                    query = filters.pop('q')

                    #check if you are filtering by stores
                    if filters.get('filter') == 'stores':
                        stores = Store.objects.filter(Q(name__icontains=query) | Q(food__name__icontains=query)).distinct()
                        stores = stores.filter(state='open')
                        stores = StoresSerializer(stores, many=True, context={'request': request}).data
                        if filters.get('order') == 'value':
                            stores = sorted(stores, key=lambda x: x['average_price'])
                        elif filters.get('order') == 'assessment':
                            stores = sorted(stores, key=lambda x: x['average_rating'], reverse=True)
                    #if it's not for stores, it's for items
                    else:
                        stores = Store.objects.filter(food__name__icontains=query).distinct()
                        stores = stores.filter(state='open')
                        stores = ItemsAvaliableSerializer(stores, many=True, context={'request': request}).data
                        if filters.get('order') == 'value':
                            stores = sorted(stores, key=lambda x: x['min_price'])
                            for store in stores:
                                store['foods'] = sorted(store['foods'], key=lambda x: float(x['value']))
                        if filters.get('order') == 'assessment':
                            stores = sorted(stores, key=lambda x: x['average_rating'], reverse=True)


                    stores_open = [store for store in stores if (store['is_open_now'])]
                    stores_close = [store for store in stores if (not store['is_open_now'])]

                    return Response({'open': stores_open, 'close': stores_close}, status=status.HTTP_200_OK)
                except Exception as e:
                    return Response({"error": f"An error occurred when searching for stores: {e}"}, status=status.HTTP_400_BAD_REQUEST)
            #checks if the search is for a specific store
            
            #elif:

            #if it does not match previous searches, the search is for all open stores
            else:
                stores = StoresSerializer(Store.objects.filter(state='open'), many=True, context={'request': request}).data
                stores = [store for store in stores if (store['is_open_now'])]
                return Response(stores, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"An error occurred when searching for stores: {e}"}, status=status.HTTP_400_BAD_REQUEST)