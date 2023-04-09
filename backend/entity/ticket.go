package entity

import (
	"gorm.io/gorm"
)

type Ticket struct {
	gorm.Model

	Title string

	Description string

	Contact_information string

	Timestamp string
}
