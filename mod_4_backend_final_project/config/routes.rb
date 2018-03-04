Rails.application.routes.draw do
  resources :clips
  resources :users

  post '/login' => "users#login"
  patch '/clips/:id' => "clips#update"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
