from flask_wtf import FlaskForm
from wtforms.validators import DataRequired, Length
from wtforms import StringField, TextAreaField, FileField, SubmitField, SelectField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class AlbumForm(FlaskForm):
    category = StringField("Category", validators=[DataRequired(), Length(max=100)])
    title = StringField("Title", validators=[DataRequired(), Length(max=30)])
    description = TextAreaField("Description", validators=[DataRequired()])
    cover = FileField("Cover Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Album")