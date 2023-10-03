from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from professor.api.V1.permissions import IsSuperuserOrProfessor, IsSuperuserOrOwnProfessor
from accounts.models import Professor, User
from rest_framework import status
from professorrequest.models import ProfessorRequest
from .serializers import ProfessorRequestSerializer
from notification.models import Notification


class ListRequest(APIView):
    permission_classes = [IsSuperuserOrProfessor]

    @swagger_auto_schema(
        operation_description="""This endpoint allows professor to see list off request.

            The response will contain a success message including these fields:
                - body
                - sender
                - receiver
                - code
                - status
                off all request
                """,
        operation_summary="endpoint for list of request",

        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request):
        try:
            professor = Professor.objects.get(id=request.user.id)
        except Professor.DoesNotExist:
            return Response({'message': 'professor does not exist'}, status=status.HTTP_404_NOT_FOUND)
        req = ProfessorRequest.objects.filter(receiver=professor)
        ser_data = ProfessorRequestSerializer(req, many=True)
        if req:
            return Response(data=ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "شما در حال حاضر درخواستی در سیستم ندارید"}, status=status.HTTP_404_NOT_FOUND)


class GetRequest(APIView):
    permission_classes = [IsSuperuserOrProfessor]

    @swagger_auto_schema(
        operation_description="""This endpoint allows professor to get information off one request.

            The request should include the id off request.

            The response will contain a success message including these fields:
                - status
                - sender
                - body
                - code
                - receiver""",
        operation_summary="endpoint for get all of information of one request",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, id):
        try:
            professor = Professor.objects.get(id=request.user.id)
        except Professor.DoesNotExist:
            return Response({'message': 'professor does not exist'}, status=status.HTTP_404_NOT_FOUND)
        req = ProfessorRequest.objects.filter(receiver=professor, id=id)
        ser_data = ProfessorRequestSerializer(req, many=True)
        if req:
            return Response(data=ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "شما در حال حاضر درخواستی در سیستم ندارید"}, status=status.HTTP_404_NOT_FOUND)


class AcceptRequest(APIView):
    permission_classes = [IsSuperuserOrOwnProfessor]

    @swagger_auto_schema(
        operation_description="""This endpoint allows professor to accept a request of one student.

             The request should include the id of request
             this function check student have not any professor and this professor go to filled professor of student
             """,
        operation_summary="endpoint for accept request and assign student to one school",
        responses={
            '200': 'ok',
            '400': 'bad request',
            '404': 'not found'
        }
    )
    def post(self, request, pk):
        try:
            req = ProfessorRequest.objects.get(id=pk)
        except ProfessorRequest.DoesNotExist:
            return Response({'message': 'professor_request does not exist'}, status=status.HTTP_404_NOT_FOUND)
        student = req.sender
        professor = req.receiver
        self.check_object_permissions(request, professor)
        if student.professor2 is None:
            student.professor2 = professor
            if student.is_reject is True:
                student.is_reject = False
            student.save()
            Notification.objects.create(sender=User.objects.get(id=professor.id),
                                        receiver=User.objects.get(id=student.id), code=701)
            req.status = 'a'
            req.save()
            return Response({'message': 'this request accepted'})
        else:
            return Response({'message': 'this student have professor before'})


class RejectRequest(APIView):
    permission_classes = [IsSuperuserOrOwnProfessor]

    @swagger_auto_schema(
        operation_description="""This endpoint allows professor to reject a request of one student.

             The request should include the id of request
             this function check student have not any professor and this professor go to filled professor of student
             """,
        operation_summary="endpoint for accept request and assign student to one school",
        responses={
            '200': 'ok',
            '400': 'bad request',
            '404': 'not found'
        }
    )
    def post(self, request, pk):
        try:
            req = ProfessorRequest.objects.get(id=pk)
        except ProfessorRequest.DoesNotExist:
            return Response({'message': 'professor_request does not exist'}, status=status.HTTP_404_NOT_FOUND)
        student = req.sender
        professor = req.receiver
        self.check_object_permissions(request, professor)
        if student.professor2 is None:
            student.professor2 = None
            student.is_reject = True
            if student.rejected_professors is None:
                student.rejected_professors = str(professor.username)
            else:
                first_username = str(student.rejected_professors)
                student.rejected_professors = first_username + " " + str(professor.username)
            student.save()
            Notification.objects.create(sender=User.objects.get(id=professor.id),
                                        receiver=User.objects.get(id=student.id), code=701, title="رد درخواست", body=f"استاد {professor.username} درخواست دانشجو {student.username} را مبنی بر انتساب به عنوان استاد درس کارورزی رد نموده است")
            req.status = 'na'
            req.save()
            return Response({'message': 'this request rejected'})
        else:
            return Response({'message': 'this student have professor before'})







