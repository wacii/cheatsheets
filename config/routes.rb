Rails.application.routes.draw do
  mount JasmineRails::Engine, at: '/specs' if defined?(JasmineRails)
  devise_for :users
  root 'pages#index'
end
