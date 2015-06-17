require 'rails_helper'

describe ItemsController, type: :controller do
  describe '#insert_at' do
    let(:item) { double('Item') }
    before { allow(Item).to receive(:find).and_return(item) }

    it 'inserts item at provided position' do
      expect(item).to receive(:insert_at).with(3)
      get :insert_at, item_id: 1, position: 3
    end

    it 'returns updated item as json' do
      allow(item).to receive(:insert_at)
      expect(item).to receive(:to_json).and_return('json')
      get :insert_at, item_id: 1, position: 3
      expect(response.body).to eq('json')
    end
  end
end
