package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("ticket.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(&User{}, &Ticket{})

	db = database

	password1, err := bcrypt.GenerateFromPassword([]byte("1234"), 14)
	admin1 := User{
		Name:     "กอเอ๋ย กอไก่",
		Username: "admin",
		Password: string(password1),
	}
	db.Model(&User{}).Create(&admin1)
}
