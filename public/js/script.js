//script for signup page
$(document).ready(function () {

    $('.form-control').focus(function () {
        $(this).removeClass('error');
        $('#errorMessage').text('');
    });

    //user signUp
    $('#submitBtn').click(function (e) {
        e.preventDefault()
     
        const username = $('#username').val().trim()
        const email = $('#email').val().trim()
        const password=$('#password').val().trim()
            console.log(username,email,password);
        if (username === ''|| email === '' || password==="") {
        
            $('#errorMessage').text('Please fill in all fields.');
            $('.form-control').addClass('error') 

            return;
        }
        if(username.length<=3){
            $('#errorMessage').text('Name must be at least 4 characters long.');
            $('#username').addClass('error')   
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#errorMessage').text('Invalid email format.');
            $('#email').addClass('error');
            return;
        }
        if(password.length<8){
           
            $('#errorMessage').text('Password must be at least 8 characters long.'); 
            $('#password').addClass('error') 
            return;
        }
      
     
       
    //  $('#myForm').submit(); 
    $.ajax({
        type: 'POST', 
        url: '/signUp',
        data: $('#myForm').serialize(), 
        success: function(response) {
            if (response.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'successfully created a account',
                    showConfirmButton: false,
                    timer: 1500,
                    didClose:()=>{
                  window.location.href = '/';
                    }
                  })
                console.log('success:', response.message);
            } else {
                $('#errorMessage').text(response.message)
            }
           
        },
        error: function(error) {
            
            console.error('Error:', error);
        }
    });
        
      
    });

    //user login
    $("#loginSubmitBtn").click(function(e){
        e.preventDefault()
       
       
        const email = $('#loginEmail').val().trim()
        const password=$('#loginPassword').val().trim()
        if ( email === '' || password==="") {
        
            $('#errorMessage').text('Please fill in all fields.');
            $('.form-control').addClass('error') 
    
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#errorMessage').text('Invalid email format.');
            $('#loginEmail').addClass('error');
            return;
        }
    
        $.ajax({
            type: 'POST', 
            url: '/login',
            data: $('#login-form').serialize(), 
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully logged in',
                        showConfirmButton: false,
                        timer: 1500,
                        didClose:()=>{
                      window.location.href = '/';
                        }
                      })
                    console.log('success:', response.message);
                } else {
                    $('#errorMessage').text(response.message)
                }
               
            },
            error: function(error) {
                
                console.error('Error:', error);
            }
        });
       
    })
 
    //admin login
    $("#adminLoginSubmit").click(function(e){
        e.preventDefault()
       
       
        const email = $('#adminEmail').val().trim()
        const password=$('#adminPassword').val().trim()
        if ( email === '' || password==="") {
        
            $('#errorMessage').text('Please fill in all fields.');
            $('.form-control').addClass('error') 
    
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#errorMessage').text('Invalid email format.');
            $('#adminEmail').addClass('error');
            return;
        }
   
        $.ajax({
            type: 'POST', 
            url: 'admin/login',
            data: $('#admin-form').serialize(), 
            success: function(response) {
                if (response.success) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully logged in',
                        showConfirmButton: false,
                        timer: 1500,
                        didClose:()=>{
                      window.location.href = '/admin';
                        }
                      })
                    console.log('success:', response.message);
                } else {
                    $('#errorMessage').text(response.message)
                }
               
            },
            error: function(error) {
                
                console.error('Error:', error);
            }
        });
       
    })
  

    //add create user
    $('#addUsersubmitBtn').click(function (e) {
        e.preventDefault()
     
        const username = $('#addUsername').val().trim()
        const email = $('#addEmail').val().trim()
        const password=$('#addPassword').val().trim()
            console.log(username,email,password);
        if (username === ''|| email === '' || password==="") {
        
            $('#addUserErrorMessage').text('Please fill in all fields.');
            $('.form-control').addClass('error') 

            return;
        }
        if(username.length<=3){
            $('#addUserErrorMessage').text('Name must be at least 4 characters long.');
            $('#addUsername').addClass('error')   
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#addUserErrorMessage').text('Invalid email format.');
            $('#addEmail').addClass('error');
            return;
        }
        if(password.length<8){
           
            $('#addUserErrorMessage').text('Password must be at least 8 characters long.'); 
            $('#addPassword').addClass('error') 
            return;
        }
      
     
       
    //  $('#myForm').submit(); 
    $.ajax({
        type: 'POST', 
        url: '/admin/addUsers',
        data: $('#useraddMyForm').serialize(), 
        success: function(response) {
            console.log("ajax call response")
            if (response.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully added new account',
                    showConfirmButton: false,
                    timer: 1500,
                    didClose:()=>{
                  window.location.reload()
                    }
                  })
                console.log('success:', response.message);
            } else {
                $('#addUserErrorMessage').text(response.message)
            }
           
        },
        error: function(error) {
            
            console.error('Error:', error);
        }
    });
        
      
    });
    
    //update user
    $('#updateUsersubmitBtn').click(function (e) {
        e.preventDefault()
     
        const username = $('#updateUsername').val().trim()
        const email = $('#updateEmail').val().trim()
        const password=$('#updatePassword').val().trim()
            console.log(username,email,password);
        if (username === ''|| email === '') {
        
            $('#updateUserErrorMessage').text('Please fill fields');
            $('.form-control').addClass('error') 

            return;
        }
        if(username.length<=3){
            $('#updateUserErrorMessage').text('Name must be at least 4 characters long.');
            $('#updateUsername').addClass('error')   
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#updateUserErrorMessage').text('Invalid email format.');
            $('#updateEmail').addClass('error');
            return;
        }
        if(password.length){
        if(password.length<8){
           
            $('#updateUserErrorMessage').text('Password must be at least 8 characters long.'); 
            $('#updatePassword').addClass('error') 
            return;
        }
    }
     
       
    //  $('#myForm').submit(); 
    $.ajax({
        type: 'PUT', 
        url: '/admin/updateUser',
        data: $('#updateUserMyForm').serialize(), 
        success: function(response) {
            console.log("ajax call response")
            if (response.success) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully updated',
                    showConfirmButton: false,
                    timer: 1500,
                    didClose:()=>{
                  window.location.reload()
                    }
                  })
                console.log('success:', response.message);
            } else {
                $('#addUserErrorMessage').text(response.message)
            }
           
        },
        error: function(error) {
            
            console.error('Error:', error);
        }
    });
        
      
    });
   
   
   
});

const handleDelete=(id)=>{

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        $.ajax({
            type: 'DELETE', 
            url: `/admin/${id}`,
            // data: $('#myForm').serialize(), 
            success: function(response) {
                if (response.success) {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      ).then(()=>{
                        window.location.href = '/admin';
                      })
                     
                    console.log('success:', response.message);
                } else {
                    swalWithBootstrapButtons.fire(
                        'Cancelled',
                        
                      )
                }
               
            },
            error: function(error) {
                
                console.error('Error:', error);
            }
        });
      
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        
      )
    }
  })
}

let table = new DataTable('#myTable');




