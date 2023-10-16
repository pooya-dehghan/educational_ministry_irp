from rest_framework.views import APIView
from officemanager.api.V1.permissions import IsSuperuserOrOfficeManager, IsSuperuserOrOwnOfficeManager
from accounts.models import OfficeManager, User, School, Student
from request.models import Request
from request.serializers import RequestSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import status
from notification.models import Notification
from .serializers import NotificationSerializer
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from .swagger_info import swagger_parameters_request
from jalali_date import datetime2jalali
from django.utils import timezone
from .serializers import SearchSerializer


class ListRequest(APIView):
    permission_classes = [IsSuperuserOrOfficeManager]

    @swagger_auto_schema(
        operation_description="""This endpoint allows office_manager to see list off request.

            The response will contain a success message including these fields:
                - status
                - sender
                - receiver
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
            office_manager = OfficeManager.objects.get(id=request.user.id)
        except OfficeManager.DoesNotExist:
            return Response({'message': 'همچین مسیول اداره ای وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        req = Request.objects.filter(receiver=office_manager).order_by('-status')
        ser_data = RequestSerializer(req, many=True)
        if req:
            return Response(data=ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "شما در حال حاضر درخواستی در سیستم ندارید", 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)


class GetRequest(APIView):
    permission_classes = [IsSuperuserOrOfficeManager]

    @swagger_auto_schema(
        operation_description="""This endpoint allows office_manager to get information off one request.

            The request should include the id off request.

            The response will contain a success message including these fields:
                - status
                - sender
                - refresh
                - receiver""",
        operation_summary="endpoint for get all of information of one request",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request, id):
        try:
            office_manager = OfficeManager.objects.get(id=request.user.id)
        except OfficeManager.DoesNotExist:
            return Response({'message': 'همچین مسیول اداره ای وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        req = Request.objects.filter(receiver=office_manager, id=id)
        ser_data = RequestSerializer(req, many=True)
        if req:
            return Response(data=ser_data.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "شما در حال حاضر درخواستی در سیستم ندارید", 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)


class RejectRequest(APIView):
    permission_classes = {IsSuperuserOrOwnOfficeManager}

    @swagger_auto_schema(
        operation_description="""This endpoint allows office_manager to reject a request.

             The request should include the id of request
             this function check  notification does not accept before
             after reject this function and sent a notification to student
             """,
        operation_summary="endpoint for reject request",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def post(self, request, pk):
        try:
            req = Request.objects.get(id=pk)
        except Request.DoesNotExist:
            return Response({'message': 'همچین درخواستی ای وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        office_manager = req.receiver
        student = req.sender
        self.check_object_permissions(request, office_manager)
        if req.status != 'a':
            req.status = 'na'
            req.save()
            Notification.objects.create(code=401, sender=request.user, receiver=User.objects.get(id=student.id))
            return Response({'message': 'درخواست رد شد', 'Success': True}, status=status.HTTP_200_OK)
        return Response({'message': 'این درخواست قبلا تایید شده', 'Success': False}, status=status.HTTP_400_BAD_REQUEST)


class AcceptRequest(APIView):
    permission_classes = [IsSuperuserOrOwnOfficeManager]

    @swagger_auto_schema(
        operation_description="""This endpoint allows office_manager to accept a request.

             The request should include the id of request and id of school
             this function first check the school in region of office_manager second 
             check  does not not accept before 
             third check student not join in any school before and school capacity larger than zero  
             after accept this function and assign student to a school 
             and send a notification to student whit content your request accept
             """,
        operation_summary="endpoint for accept request and assign student to one school",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def post(self, request, school_id, request_id):
        try:
            req = Request.objects.get(id=request_id)
        except Request.DoesNotExist:
            return Response({'message': 'همچین درخواستی ای وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        office_manager = req.receiver
        student = req.sender
        self.check_object_permissions(request, office_manager)
        try:
            school = School.objects.get(pk=school_id)
        except School.DoesNotExist:
            return Response({'message': 'همچین مدرسه ای وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        print("*"*140)
        print(req)
        print(student)
        print(school)
        print("*"*140)
        if school.office_manager == office_manager:
            if req.status != 'na':
                if student.school2 is None:
                    if school.capacity > 0:
                        req.status = 'a'
                        req.save()
                        student.school2 = school
                        student.save()
                        capacity = school.capacity
                        capacity -= 1
                        school.capacity = capacity
                        school.save()
                        Notification.objects.create(code=501, sender=request.user,
                                                    receiver=User.objects.get(id=student.id))
                        return Response({
                            'message': f'این درخواست با موفقیت پذیرفته شد و دانشجوی{student.username} به مدرسه {school.name} معرفی شد',
                            'Success': True},
                            status=status.HTTP_200_OK)
                    else:
                        return Response({'message': 'این مدرسه ظرفیت کافی ندارد', 'Success': False}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'message': 'این دانش آموز قبلا مدرسه داشته است اشتباهی به شما درخواست داده است',
                                     'Success': False},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': 'این درخواست قبلا رد شده است', 'Success': False},
                                status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message': 'این مدرسه در منطقه شما نیست ', 'Success': False},
                            status=status.HTTP_400_BAD_REQUEST)


class CancelRequest(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows student to cancel his request

              This view first check a student use this function then get a request from this student with status sent 
              means accept and not accept then get notification of this request and then deleted
              """,
        operation_summary="endpoint for cancel request",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def post(self, request):
        student = Student.objects.filter(id=request.user.id).first()
        if student:
            req = Request.objects.filter(sender=student, status='s').last()
            if req:
                notification = Notification.objects.filter(sender=User.objects.get(id=student.id),
                                                           receiver=User.objects.get(id=req.receiver.id)).last()
                req.delete()
                notification.delete()
                return Response({'message': 'ریکویست و نوتیفیکیشن دلیت شدند', 'Success': True})
            else:
                return Response({'message': 'شما درخواستی برای کنسل کردن ندارید', 'Success': False})
        else:
            return Response({'message': 'شما دانش آموز نیستید', 'Success': False})


class SuperUserListRequest(APIView):
    permission_classes = [IsAdminUser]

    @swagger_auto_schema(
        operation_description="""This endpoint allows super_user to get all request.
                 """,
        operation_summary="endpoint for get all request",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request):
        requests = Request.objects.all()
        ser_data = NotificationSerializer(requests, many=True)
        return Response({"data": ser_data.data}, status=status.HTTP_200_OK)


class RequestForSchool(APIView):
    # permission_classes = [IsSuperuser]
    @swagger_auto_schema(
        manual_parameters=swagger_parameters_request,
        operation_description="""This endpoint allows student  to send a request to office_manager.

            The request should include the office_manager id.

            """,
        operation_summary="endpoint for send request to office_manager",
        responses={
            '201': 'created',
        }
    )
    def post(self, request, region):
        try:
            sender = Student.objects.get(id=request.user.id)
        except Student.DoesNotExist:
            return Response({'message': 'همچین دانش آموزی وجود ندارد', 'Success': False},
                            status=status.HTTP_404_NOT_FOUND)
        try:
            receiver = OfficeManager.objects.get(region=region)
        except OfficeManager.DoesNotExist:
            return Response(
                {'message': 'منطقه ارسالی شما در حال حاضر یا مسءولی در سیستم ندارد یا اشتباه است', 'Success': False},
                status=status.HTTP_404_NOT_FOUND)
        if sender.school2 is not None:
            return Response({'message': 'شما مدرسه دارید پس نمیتوانید دوباره درخواست دهید', 'Success': False})
        if Request.objects.filter(sender=sender, status='s').exists():
            return Response({'message': 'شما قبلا درخواستی فرستاده اید که هنوز تایین وضعیت نشده است لطفا شکیبا باشید',
                             'Success': False})
        if Request.objects.filter(sender=sender, receiver=receiver).exists():
            return Response(
                {'message': 'شما قبلا به این اداره درخواست داده اید نمیتواتید دوباره درخواست دهید ', 'Success': False})
        req = Request.objects.create(sender=sender, receiver=receiver)
        req.save()
        dt = timezone.now()
        req_date = datetime2jalali(dt).strftime('%y-%m-%d')
        req_date = "14" + req_date
        dt = datetime2jalali(dt).strftime('%y-%m-%d')
        dt = "14" + dt
        dt = dt.replace('-', '')
        id_number = req.id
        str_id = ''
        if id_number < 10:
            str_id = "000" + str(id_number)
        elif id_number < 100:
            str_id = "00" + str(id_number)
        elif id_number < 1000:
            str_id = "0" + str(id_number)
        elif id_number > 1000 or id_number == 1000:
            str_id = str(id_number)
        req.code = dt + str_id
        req.save()
        Notification.objects.create(sender=request.user, receiver=receiver, code=301)
        return Response(
            {'message': 'درخواست با موفقیت ارسال شد', 'request_id': req.id, 'request.code': req.code, 'date': req_date,
             'Success': True},
            status=status.HTTP_201_CREATED)


class StudentGetRequestStatus(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows student to get status of his request.


            The response will contain a success message including these fields:
                - view seen - unseen
                - status send - not send - pending - not accepted - accepted
                when status is pending or accepted or not accepted means view is seen  
                when status is not send means view is not seen 
                when status is send sometime view is seen and sometime view is not seen  


                """,
        operation_summary="endpoint for get status of request",
        responses={
            '200': 'ok',
            '404': 'not found'
        }
    )
    def get(self, request):
        try:
            student = Student.objects.get(id=request.user.id)
        except Student.DoesNotExist:
            return Response({'message': 'شما دانشجو نیستید', 'Success': False}, status=status.HTTP_404_NOT_FOUND)
        stu_request = Request.objects.filter(sender=student).last()
        if stu_request:
            if stu_request.status == "s":
                return Response({'message': "ارسال شده و در حال انتظار", 'Success': True},
                                status=status.HTTP_200_OK)
            if stu_request.status == "n":
                return Response({'message': "ارسال نشده", 'Success': False}, status=status.HTTP_200_OK)
            if stu_request.status == "na":
                return Response({'message': "عدم تایید", 'Success': False}, status=status.HTTP_200_OK)
            if stu_request.status == "a":
                return Response({'message': "تایید", 'Success': True}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'شما هیج درخواستی ندارید', 'Success': False}, status=status.HTTP_404_NOT_FOUND)


class MakeRequestPendingView(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows to superuser or admin to make a request pending again.

            The request should include the request's id.

            """,
        operation_summary="endpoint for make request pending",
        responses={
            '200': 'ok',
            '400': 'bad request'
        }
    )
    def post(self, request, id):
        try:
            OfficeManager.objects.get(id=request.user.id)
        except:
            return Response({"message": "شما اجازه دسترسی به این مکان را ندارید", "status": status.HTTP_400_BAD_REQUEST,
                             "success": False})
        request = Request.objects.get(id=id)
        request.status = 'p'
        request.save()
        return Response(
            {"message": "درخواست با موفقیت به حالت تعلیق در آمد", "success": True, "status": status.HTTP_200_OK})


class SearchRequest(APIView):
    @swagger_auto_schema(
        operation_description="""This endpoint allows to search user base on code.

             The user include code of request
             """,
        operation_summary="endpoint for search base code",
        responses={
            '200': 'ok',
            '400': 'bad request',
            '404': 'not found'
        }
    )
    def post(self, request):
        ser_data = SearchSerializer(data=request.data)
        if ser_data.is_valid():
            search = ser_data.validated_data['search']
            try:
                req = Request.objects.get(code=search)
            except Request.DoesNotExist:
                return Response({'message': 'همچین درخواستی وجود ندارد', 'Success': False},
                                status=status.HTTP_404_NOT_FOUND)
            ser_data_request = RequestSerializer(req)
            return Response({'data': ser_data_request.data, 'Success': True}, status=status.HTTP_200_OK)
        return Response({'message': ser_data.errors, 'Success': False}, status=status.HTTP_400_BAD_REQUEST)
