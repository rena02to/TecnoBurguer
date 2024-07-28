from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FoodSerializer
from rest_framework.permissions import BasePermission
from rest_framework.permissions import IsAuthenticated

class IsUserType(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.type == 'admin' or request.user.type == 'sudo')

class CreateFood(APIView):
    permission_classes = [IsUserType]
    def post(self, request):
        serializer = FoodSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)