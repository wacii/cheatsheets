case Rails.env
when 'development'
  # delete existing data
  tables = %w(Item Cheatsheet User)
    tables.each do |table|
    table.constantize.delete_all
  end

  # add users
  user1 = User.create(email: 'sally.test@example.com', password: 'password', password_confirmation: 'password')
  user2 = User.create(email: 'joe.test@example.com', password: 'password', password_confirmation: 'password')

  # add cheatsheets and items
  sheets = %w(Git Rake Rails Heroku Brew)
  cheatsheet1 = Cheatsheet.create(user_id: user1.id, title: 'Git')
  cheatsheet2 = Cheatsheet.create(user_id: user1.id,title: 'Rake')
  cheatsheet3 = Cheatsheet.create(user_id: user1.id,title: 'Rails Console')
  cheatsheet4 = Cheatsheet.create(user_id: user1.id,title: 'Heroku')
  cheatsheet5 = Cheatsheet.create(user_id: user1.id,title: 'Brew')

  #add items
  items = %w(Item1 Item2 Item3 Item4 Item5 )
  descriptions = %w(Description1 Description2 Description3 Description 4 Description5)
  i=0
  5.times do
    cheatsheet1.items.create(name: items[i], description: descriptions[i], rank: i)
    i += 1
  end
  i=0
  5.times do
    cheatsheet2.items.create(name: items[i], description: descriptions[i], rank: i)
    i += 1
  end
  i=0
  5.times do
    cheatsheet3.items.create(name: items[i], description: descriptions[i], rank: i)
    i += 1
  end
  i=0
  5.times do
    cheatsheet4.items.create(name: items[i], description: descriptions[i], rank: i)
    i += 1
  end
  i=0
  5.times do
    i += 1
    cheatsheet5.items.create(name: items[i], description: descriptions[i], rank: i)
  end

when 'production'
end