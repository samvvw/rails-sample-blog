Rails.application.routes.draw do
  devise_for :admins
  devise_for :users, controllers: { registrations: 'user/registrations'}
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'articles#index'

  # get "/articles", to: "articles#index"
  # get "/articles/:id", to: "articles#show"
  get '/destroy_all', to: "articles#destroy_all"
  # resources :articles do
  # collection do
  #   get 'destroy_all'
  # end
# end


  resources :articles do
    resources :comments
  end



  # Defines the root path route ("/")
  # root "articles#index"
end
