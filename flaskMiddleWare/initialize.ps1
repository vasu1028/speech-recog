pip install flask
pip install Flask-PyMongo
pip install pydub
pip install bcrypt
pip install google-cloud

pip install google-api-core
pip install google-auth
pip install google-cloud-speech
pip install googleapis-common-protos
pip install grpcio

set FLASK_APP=flaskMiddleWare.py
set FLASK_DEBUG=true

$dir = [string](Get-Location) + "\external_modules\libav-x86\usr\bin\"
$Env:Path = $Env:Path + ";$dir"