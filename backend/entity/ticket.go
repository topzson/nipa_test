package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Username string `gorm:"uniqueIndex"`
	Password string

	Tickets []Ticket `gorm:"foreignKey:UserID"`
}
type Ticket struct {
	gorm.Model
	Title               string
	Description         string
	Contact_information string
	Status              string

	UserID *uint
	User   User
}
