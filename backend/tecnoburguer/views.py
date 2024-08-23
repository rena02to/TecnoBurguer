from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db.models import Q
from .serializers import UserSerializer, StoresOpenSerializer, ItemsAvaliableSerializer
from .models import Store

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_from_token(request):
    user = request.user
    return Response({'language': user.language, 'name': user.name, 'type': user.type}, status=status.HTTP_201_CREATED)

#register user
class Register(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_type = request.data.get('type', None)

        # Usuário autenticado
        if request.user.is_authenticated:
            if request.user.type == 'admin':
                if user_type != 'client' and user_type != 'sudo':
                    serializer = UserSerializer(data=request.data)
                    if serializer.is_valid():
                        serializer.save()
                        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': 'Admins cannot create sudo or client users'}, status=status.HTTP_403_FORBIDDEN)
            elif request.user.type == 'sudo':
                serializer = UserSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'User not authorized to create new users'}, status=status.HTTP_403_FORBIDDEN)
        
        # Usuário não autenticado
        else:
            if user_type == 'client':
                serializer = UserSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Only customers can be registered without authentication'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def get_stores_open(request):
    stores = StoresOpenSerializer(Store.objects.filter(state='open'), many=True, context={'request': request}).data
    stores = [store for store in stores if (store['is_open_now'])]
    return Response(stores, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def search(request):
    query = request.GET.get('q', '')
    filters = request.GET.dict()
    filters.pop('q')

    if filters.get('filter') == 'stores':
        stores = Store.objects.filter(name__icontains=query).distinct()
        stores = stores.filter(state='open')
        stores = StoresOpenSerializer(stores, many=True, context={'request': request}).data
    else:
        stores = Store.objects.filter(food__name__icontains=query).distinct()
        stores = stores.filter(state='open')
        stores = ItemsAvaliableSerializer(stores, many=True, context={'request': request}).data

    stores_open = [store for store in stores if (store['is_open_now'])]
    stores_close = [store for store in stores if (not store['is_open_now'])]

    return Response({'open': stores_open, 'close': stores_close})
    
    #ordenar por preço: stores_open = sorted(stores_open, key=lambda x: x[orderby])
    #ordenar por preço: stores_close = sorted(stores_close, key=lambda x: x[orderby])

    #ordenar por avaliação: stores_open = sorted(stores_open, key=lambda x: x['average_rating'], reverse=True)
    #ordenar por avaliação: stores_close = sorted(stores_close, key=lambda x: x['average_rating'], reverse=True)

    #ordenar por tempo de entrega: stores_open = sorted(stores_open, key=lambda x: x['time_delivery'])
    #ordenar por tempo de entrega: stores_close = sorted(stores_close, key=lambda x: x['time_delivery'])

    #ordenar por taxa de entrega: stores_open = sorted(stores_open, key=lambda x: x['rate'])
    #ordenar por taxa de entrega: stores_close = sorted(stores_close, key=lambda x: x['rate'])

    #ordenar por distancia: stores_open = sorted(stores_open, key=lambda x: x['distance'])
    #ordenar por distancia: stores_close = sorted(stores_close, key=lambda x: x['distance'])

    #filtrar por taxa de entrega: stores_open = [store_open for store_open in stores_open if (store[valor])] em que valor é o valor do filtro da taxa de entrega
    #filtrar por taxa de entrega: stores_close = [store_close for store_close in stores_close if (store[valor])] em que valor é o valor do filtro da taxa de entrega