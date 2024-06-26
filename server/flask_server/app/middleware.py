from flask import jsonify
from werkzeug.exceptions import HTTPException

def handle_error(e):
    if isinstance(e, HTTPException):
        code = e.code if hasattr(e, 'code') else 500
        name = e.name if hasattr(e, 'name') else 'Internal Server Error'
        description = e.description if hasattr(e, 'description') else 'An unexpected error occurred.'
        
        response = jsonify({
            "code": code,
            "name": name,
            "description": description
        })
        response.status_code = code
        return response
    
    # For non-HTTP exceptions, or unexpected cases
    return jsonify({"message": str(e)}), 500
