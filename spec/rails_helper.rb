ENV['RAILS_ENV'] ||= 'test'
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'capybara/rspec'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
ActiveRecord::Migration.maintain_test_schema!
Capybara.javascript_driver = :webkit

RSpec.configure do |config|
  config.use_transactional_fixtures = false

  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.strategy =
      example.metadata[:js] ? :truncation : :transaction
    DatabaseCleaner.cleaning { example.run }
  end

  config.infer_spec_type_from_file_location!

  config.include Devise::TestHelpers, type: [:controller, :view]
  config.include Warden::Test::Helpers, type: :feature
  config.include FactoryGirl::Syntax::Methods
end
