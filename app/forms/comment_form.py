from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, DecimalField, SelectField, IntegerField, FileField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class CommentForm(FlaskForm):

    content = TextAreaField("Comment", validators=[DataRequired(), Length(max=500)])
    submit = SubmitField("Submit Comment")