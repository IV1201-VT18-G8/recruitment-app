def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user_id': user.pk,
        'is_applicant': user.is_applicant,
        'is_recruiter': user.is_recruiter,
    }
