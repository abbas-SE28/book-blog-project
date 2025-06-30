class BooksController < ApplicationController
  before_action :require_admin, only: [:create, :update, :destroy]
  before_action :set_book, only: [:show, :update, :destroy]
  
  def index
    books = Book.includes(:category, :comments).all
    books = books.where(category_id: params[:category_id]) if params[:category_id].present?
    books = books.where(status: params[:status]) if params[:status].present?
    
    render json: books.map { |book| book_summary(book) }
  end
  
  def show
    render json: book_detail(@book)
  end
  
  def create
    book = Book.new(book_params)
    if book.save
      render json: book_detail(book), status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def update
    if @book.update(book_params)
      render json: book_detail(@book)
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @book.destroy
    head :no_content
  end
  
  private
  
  def set_book
    @book = Book.find(params[:id])
  end
  
  def book_params
    params.require(:book).permit(:title, :author, :description, :notes, :status, :category_id)
  end
  
  def book_summary(book)
    {
      book_id: book.id,
      title: book.title,
      author: book.author,
      status: book.status,
      category: book.category.category_name,
      comments_count: book.comments.count,
      date_added: book.date_added
    }
  end
  
  def book_detail(book)
    Rails.logger.info "Book status raw: #{book[:status]}"
Rails.logger.info "Book status enum method: #{book.status}"

    {
      book_id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      notes: book.notes,
      status: book.status,
      category: {
        category_id: book.category_id,
        category_name: book.category.category_name
      },
      comments: book.comments.includes(:user).map { |c| comment_response(c) },
      date_added: book.date_added
    }
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
