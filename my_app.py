from flask import Flask, request, send_from_directory
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/catalogue')
def catalogue():
    return render_template('catalogue.html')

# Static sitemap
@app.route('/sitemap.xml')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])

# Custom 404 page
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# We only need this for local development.
if __name__ == '__main__':
    app.run()
