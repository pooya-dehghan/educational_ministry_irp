from django.core.cache import cache
from django.http import JsonResponse
import requests

def test(request):
    if cache.get('test_display_fivee') is None:
        response = requests.get("https://0a04c327-1735-4b40-ac23-6981ecf4726d.mock.pstmn.io/test/5/")
        cache.set('test_display_fivee', response.json())
    return JsonResponse(cache.get('test_display_fivee'))
