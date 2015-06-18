require 'rails_helper'

describe Cheatsheet, type: :model do
  subject(:cheatsheet) { create(:cheatsheet) }

  it 'has a valid Factory' do
    expect(build(:cheatsheet)).to be_valid
  end

  it { should belong_to(:user) }
  it { should have_many(:items) }

  it { should validate_presence_of(:title) }

  it { should have_db_column(:user_id) }
  it { should have_db_column(:title) }
  it { should have_db_column(:created_at) }
  it { should have_db_column(:updated_at) }

  it { should have_db_index(:user_id) }
end
