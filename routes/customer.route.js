const express = require("express");
const router = express.Router();

const {
  showCustomers,
  editCustomer,
  updateCustomer,
  createCustomer,
  deleteCustomer,
  validateCustomer
} = require("../controllers/customer.controller");
const { validate } = require("../libs/models/user.model");

// NESTED-ROUTE:: '/dashboard/customers'
router.get("/",showCustomers);

// ROUTE:: '/dashboard/customers/create'
router.get('/create',(req,res) => {
  res.render('pages/customers', {
    title:'Create Customer',
    formAction: 'create',
    type:'form',
    customer: req.flash('data')[0],
    errors: req.flash('errors'),
  })
});

router.post('/create',validateCustomer,createCustomer)

router.get('/:id/edit',editCustomer);

router.post('/:id/edit',validateCustomer,updateCustomer);

router.post('/:id/delete',deleteCustomer);

module.exports = router;