class ArticlesController < ApplicationController

  before_action :authenticate_user!, :only => [:destroy, :update]

  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
    @author = User.find(@article.user_id)
  end

  def new
    @article = Article.new
  end

  def create
    @user = User.find(current_user.id)
    @article = @user.articles.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    redirect_to root_path, status: :see_other
  end

  def destroy_all
    if Rails.env.development? || Rails.env.test? 
      Article.destroy_all
      User.destroy_all
      redirect_to root_path, status: :see_other
    end
  end

  private
    def article_params
      params.require(:article).permit(:title, :body, :status)
    end
end
