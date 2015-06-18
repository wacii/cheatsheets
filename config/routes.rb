Rails.application.routes.draw do
  mount JasmineRails::Engine, at: '/specs' if defined?(JasmineRails)
  devise_for :users
  root 'pages#index'

  post 'items/:id/insert_at', to: 'items#insert_at'
  resources :cheatsheets, except: [:new, :edit] do
    resources :items, except: [:new, :edit], shallow: true
  end
end
