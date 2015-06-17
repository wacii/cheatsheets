require 'spec_helper'

describe Header, :type => :model do
  it 'has a valid Factory' do
    build(:header).should be_valid
  end
  subject(:header) { create :header }

  it { expect(header).to be_valid }

  it { expect(header).to belong_to(:user)}
  it { expect(header).to have_many(:items)}

  it { expect(header).to validate_presence_of(:name) }

  it { expect(header).to have_db_column(:user_id) }
  it { expect(header).to have_db_column(:name) }
  it { expect(header).to have_db_column(:created_at) }
  it { expect(header).to have_db_column(:updated_at) }

  it { should have_db_index(:user_id) }
end