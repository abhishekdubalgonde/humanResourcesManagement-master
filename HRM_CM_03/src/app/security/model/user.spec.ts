import	{UserModel}	from	'./user.model';

describe('UserModel	unit tests',	()	=>	{

  it('Has	correct	username',	()	=>	{
    let	a	=	new	UserModel({username:"pepe"});
    expect(a.username).toBe("pepe");
  });

})
