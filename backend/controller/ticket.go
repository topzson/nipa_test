package controller

import (
	"github.com/topzson/nipa_test/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Ticket

func CreateTicket(c *gin.Context) {

	var user entity.Ticket

	if err := c.ShouldBindJSON(&user); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&user).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": user})

}

// GET /Ticket/:id

func GetTicket(c *gin.Context) {

	var user entity.Ticket

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM tickets WHERE id = ?", id).Scan(&user).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": user})

}

// GET /Ticket

func ListTicket(c *gin.Context) {

	var users []entity.Ticket

	if err := entity.DB().Raw("SELECT * FROM tickets").Find(&users).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": users})

}

// DELETE /Ticket/:id

func DeleteTicket(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM tickets WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /Ticket

func UpdateTicket(c *gin.Context) {
	var user entity.Ticket

	if err := c.ShouldBindJSON(&user); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if tx := entity.DB().Where("id = ?", c.Param("id")).First(&user); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})

		return

	}

	if err := entity.DB().Save(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})

}
