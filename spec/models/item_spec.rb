require 'rails_helper'

describe Item, type: :model do
  subject(:item) { create(:item) }

  it 'has a valid Factory' do
    expect(build(:item)).to be_valid
  end

  it { should belong_to(:cheatsheet)}

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:description) }

  it { should have_db_column(:cheatsheet_id) }
  it { should have_db_column(:name) }
  it { should have_db_column(:description) }
  it { should have_db_column(:rank) }
  it { should have_db_column(:created_at) }
  it { should have_db_column(:updated_at) }

  it { should have_db_index(:cheatsheet_id) }
end
