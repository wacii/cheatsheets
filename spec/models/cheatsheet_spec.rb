require 'rails_helper'

describe Cheatsheet, :type => :model do
  it 'has a valid Factory' do
    build(:cheatsheet).should be_valid
  end
  subject(:cheatsheet) { create :cheatsheet }

  it { expect(cheatsheet).to be_valid }

  it { expect(cheatsheet).to belong_to(:user)}
  it { expect(cheatsheet).to have_many(:items)}

  it { expect(cheatsheet).to validate_presence_of(:title) }

  it { expect(cheatsheet).to have_db_column(:user_id) }
  it { expect(cheatsheet).to have_db_column(:title) }
  it { expect(cheatsheet).to have_db_column(:created_at) }
  it { expect(cheatsheet).to have_db_column(:updated_at) }

  it { should have_db_index(:user_id) }
end