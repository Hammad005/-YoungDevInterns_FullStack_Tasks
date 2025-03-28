MultiLogin School  System: 

Database: {
	1. Create a database in MongoDB or any other NoSQL database named "MultiLogin_School_System".
	2. Create 3 tables/collections with the names of admins, schools, and staffs.
	3. Now add all the data of tables/collections from the "db" folder to the database.
},

Site:{

	Commands:{
		1. npm install
		2. npm run dev (For development/testing)
		3. npm start (For production)
	},


	Admin: {
		Admin Data: {
			Email: hammad@gmail.com
			Password: 123456
		},


		Admin Can Do: {
			1. Admin can only View all schools with their data.
			2. Admin can only add and delete schools with their admin and staffs.
		}
	},
	

	School Admin: {
		
		School Admin Data: {
			Email: {
				1. aliAnwer92@gmail.com
				2. riazDh342@gmail.com
				3. imtiazM329@gmail.com
			},

			Password: {
				(All School Admins have same password)
				Password: 123456
			}
			
		},


		School Admin Can Do: {
			1. School Admin can view their own details.
			2. School Admin can add, edit and delete staff members.
		}

	}

};
