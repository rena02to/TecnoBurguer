from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from users.serializers import UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_from_token(request):
    user = request.user
    return Response({'status': 'success', 'id': user.id})

class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'status': 'success'})
        return Response({'status': 'error', 'error': serializer.errors})