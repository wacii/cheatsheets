Rails.application.routes.draw do
  mount JasmineRails::Engine, at: '/specs' if defined?(JasmineRails)
  devise_for :users
  root 'pages#index'
  resources :cheatsheets, except: [:new, :edit], do
    resources :items, except: [:new, :edit], shallow: true
  end
end
