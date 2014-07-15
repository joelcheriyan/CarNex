var popoverContent =
    '<form role="form" action="dashboard.html"> \
      <div class="form-group"> \
        <label for="field-username">Username</label> \
        <input type="text" class="form-control" id="field-username" placeholder="Username" required> \
      </div> \
      <div class="form-group"> \
        <label for="field-password">Password</label> \
        <input type="password" class="form-control" id="field-password" placeholder="Password" required> \
      </div> \
      <div class="checkbox pull-left"> \
        <label><input type="checkbox">Remember me</label> \
      </div> \
      <button type="submit" class="btn btn-success pull-right">Go!</button> \
    </form>';

$('#log-in').popover(
    {
        html: true,
        placement: 'bottom',
        title: 'Log In',
        container: '#popover-container',
        content: popoverContent
    });
