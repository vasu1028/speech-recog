pip install flask
pip install Flask-PyMongo
pip install pydub
pip install bcrypt

set FLASK_APP=flaskMiddleWare.py
set FLASK_DEBUG=true

$dir = [string](Get-Location) + "\external_modules\libav-x86\usr\bin\"
$Env:Path = $Env:Path + ";$dir"