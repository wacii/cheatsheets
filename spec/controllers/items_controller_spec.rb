require 'rails_helper'

describe ItemsController, type: :controller do
  describe '#insert_at' do
    let(:item) { double('Item') }
    before do
      ItemsController.skip_load_and_authorize_resource
      controller.instance_variable_set(:@item, item)
    end

    it 'inserts item at provided position' do
      expect(item).to receive(:insert_at).with(3)
      get :insert_at, id: 1, position: 3
    end

    it 'returns updated item as json' do
      allow(item).to receive(:insert_at)
      expect(item).to receive(:to_json).and_return('json')
      get :insert_at, id: 1, position: 3
      expect(response.body).to eq('json')
    end
  end
end
