package main

import (
	"github.com/topzson/nipa_test/controller"

	"github.com/topzson/nipa_test/entity"

	"github.com/gin-gonic/gin"

	"github.com/topzson/nipa_test/middlewares"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	// User Routes
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{

			// ticket
			protected.GET("/ticket", controller.ListTicket)
			protected.GET("/ticket/:id", controller.GetTicket)
			protected.POST("/tickets", controller.CreateTicket)
			protected.DELETE("/ticket/:id", controller.DeleteTicket)
			protected.PATCH("/tickets", controller.UpdateTicket)
			// User
			protected.GET("/users", controller.ListUser)
			protected.GET("/user/:id", controller.GetUser)
		}
	}
	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,PATCH,DELETE")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
