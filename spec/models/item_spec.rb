require 'rails_helper'

describe Item, :type => :model do
  it 'has a valid Factory' do
    build(:item).should be_valid
  end
  subject(:item) { create :item }

  it { expect(item).to be_valid }

  it { expect(item).to belong_to(:cheatsheet)}

  it { expect(item).to validate_presence_of(:name) }
  it { expect(item).to validate_presence_of(:description) }
  # it { expect(item).to validate_presence_of(:rank) }

  it { expect(item).to have_db_column(:cheatsheet_id) }
  it { expect(item).to have_db_column(:name) }
  it { expect(item).to have_db_column(:description) }
  it { expect(item).to have_db_column(:rank) }
  it { expect(item).to have_db_column(:created_at) }
  it { expect(item).to have_db_column(:updated_at) }

  it { should have_db_index(:cheatsheet_id) }
end
