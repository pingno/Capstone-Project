from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, IntegerField, FileField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    headline = StringField("Headline", validators=[DataRequired(), Length(max=100)])
    content = TextAreaField("Content", validators=[DataRequired(), Length(max=500)])

    image = FileField("Post Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")