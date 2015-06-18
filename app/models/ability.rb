class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user
    can :manage, Cheatsheet, user_id: user.id
    can :manage, Item, cheatsheet: { user_id: user.id }
  end
end
