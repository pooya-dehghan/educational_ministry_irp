from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import AssessmentStudentFromSchoolSerializer, AssessmentStudentFromTeacherSerializer, AssessmentInternshipSerializer
from accounts.models import Student, School, Teacher
from rest_framework import status
from ...models import AssesmentInternship, AssesmentStudentFromSchool, AssessmentStudentFromTeacher



class UploadingAssesmentStudentFromSchoolView(APIView):
    def post(self, request, id):
        try:
            student = Student.objects.get(id=id)
        except:
            return Response({"message":"دانشجوی مورد نظر یافت نشد", "success":False}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            school = School.objects.get(id=request.user.id)
        except:
            return Response({"message":"شما مدرسه ای ناشناخته هستید یا اجازه دسترسی به این مکان را ندارید", "success":False}, status=status.HTTP_403_FORBIDDEN)
        

        ser_data = AssessmentStudentFromSchoolSerializer(data=request.data)
        if ser_data.is_valid():
            AssesmentStudentFromSchool.objects.create(
                student=student,
                school=school,
                file=ser_data.validated_data["file"]
            )
            return Response({"message":"فرم ارزشیابی دانشجو با موفقیت آپلود شد", "success":True}, status=status.HTTP_201_CREATED)
        
        else:
            return Response(ser_data.error_messages, status=status.HTTP_400_BAD_REQUEST)
        