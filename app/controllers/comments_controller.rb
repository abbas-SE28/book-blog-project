class CommentsController < ApplicationController
  before_action :set_book
  before_action :set_comment, only: [:destroy]
  before_action :require_admin, only: [:destroy]
  
  def create
    comment = @book.comments.build(comment_params)
    comment.user = @current_user
    
    if comment.save
      render json: comment_response(comment), status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @comment.destroy
    head :no_content
  end
  
  private
  
  def set_book
    @book = Book.find(params[:book_id])
  end
  
  def set_comment
    @comment = @book.comments.find(params[:id])
  end
  
  def comment_params
    params.require(:comment).permit(:comment_text)
  end
  
  def comment_response(comment)
    {
      comment_id: comment.id,
      comment_text: comment.comment_text,
      user: { 
        user_id: comment.user.id, 
        name: comment.user.name,
        username: comment.user.username 
      },
      date: comment.date
    }
  end
end
