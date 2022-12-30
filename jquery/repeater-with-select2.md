# Menggunakan Repeater dengan Select2 Jquery

## HTML

```HTML
  <div class="variant-repeater">
    <div data-repeater-list="items">
      <h3>Variant</h3>
      <div class="row" data-repeater-item>

        <!-- First Row -->
        <div class="col-sm-3 col-md-2 mb-3">
          <label class="form-label">
            Variant Name <span class="text-danger">*</span>
          </label>
          <input name="variant_name" type="text" class="form-control" placeholder="Variant Name">
        </div>

        <div class="col-sm-3 col-md-auto mb-3">
          <label class="form-label">
            Size <span class="text-danger">*</span>
          </label>
          <select name="size" class="select2 form-control">
            <option value="">--Size--</option>
          </select>
        </div>

        <div class="col-sm-auto mb-3">
          <label class="form-label">Action</label>
          <div>
            <button type="button" id="repeater-delete" class="btn btn-sm btn-danger" data-repeater-delete>
              <i class="fas fa-times text-light"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button type="button" id="repeater-button" class="btn btn-sm btn-primary mr-1 repeater-add" data-repeater-create>
        <i class="fas fa-plus"></i> Add Variant
      </button>
    </div>
  </div>
```

## JQUERY

```Javascript

  $('.select2').each(function() {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // the following code is used to disable x-scrollbar when click in select input and
      // take 100% width in responsive also
      dropdownAutoWidth: true,
      width: '100%',
      dropdownParent: $this.parent()
    });
  });

  $("#repeater-button").click(function(){
    setTimeout(function(){

      $('.select2').select2({
        // the following code is used to disable x-scrollbar when click in select input and
        // take 100% width in responsive also
        dropdownAutoWidth: true,
        width: '100%',
      });

    }, 100);
  });

  // form repeater jquery
  $('.variant-repeater, .repeater-default').repeater({
    show: function (e) {
      $(this).slideDown();
      $(this).find('.select2').removeClass('select2-hidden-accessible');
      $(this).find('.select2-container').remove();
      $(this).find('.select2').select2();
    },
    hide: function (deleteElement) {
      if (confirm('Are you sure you want to delete this element?')) {
        $(this).slideUp(deleteElement);
      }
    },
  });
```