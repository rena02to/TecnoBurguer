from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_from_token(request):
    user = request.user
    return Response({'language': user.language}, status=status.HTTP_201_CREATED)

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
def get_stores(request):
    pass