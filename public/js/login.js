var popoverContent =
    '<form role="form" action="/login" method="post"> \
      <input type= "hidden", name= "_csrf", value= "token"> \
      <div class="form-group"> \
        <label for="field-username">Username</label> \
        <input name="username" value ="" type="text" class="form-control" id="field-username" placeholder="Username" required> \
      </div> \
      <div class="form-group"> \
        <label for="field-password">Password</label> \
        <input name="password" value ="" type="password" class="form-control" id="field-password" placeholder="Password" required> \
      </div> \
        <div class="checkbox pull-left"> \
          <label><input type="hidden"></label> \
        </div> \
      <button type="submit" class="btn btn-primary pull-right">Go!</button> \
    </form>';

$('#log-in').popover(
    {
        html: true,
        placement: 'bottom',
        title: 'Log In',
        container: '#popover-container',
        content: popoverContent
    });
