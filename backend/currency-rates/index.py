import json
import urllib.request


def handler(event: dict, context) -> dict:
    """Возвращает актуальные курсы USD и EUR к рублю по данным ЦБ РФ"""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    try:
        req = urllib.request.Request(
            'https://www.cbr-xml-daily.ru/daily_json.js',
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode('utf-8'))

        usd = data['Valute']['USD']
        eur = data['Valute']['EUR']

        result = {
            'date': data.get('Date'),
            'usd': {
                'value': round(usd['Value'], 2),
                'prev': round(usd['Previous'], 2),
                'change': round(usd['Value'] - usd['Previous'], 2)
            },
            'eur': {
                'value': round(eur['Value'], 2),
                'prev': round(eur['Previous'], 2),
                'change': round(eur['Value'] - eur['Previous'], 2)
            }
        }

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(result)
        }
    except Exception:
        fallback = {
            'date': None,
            'usd': {'value': 0, 'prev': 0, 'change': 0},
            'eur': {'value': 0, 'prev': 0, 'change': 0},
            'error': 'unavailable'
        }
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(fallback)
        }
