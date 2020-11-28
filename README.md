# Intro
An API that helps create dynamic meta boxes for WordPress developers <br> that saves and restores with no hassle


## Installation
```html
<script src="./wp_dmf.min.js"></script>
```

## Usage

<h3>Create Object</h3>

```javascript
foo = new WP_dmf(objectRefName,containerId,dataStoreFormName)
```
**objectRefName** <br>
(Required) WP_dmf needs the name of the instance. <br>its used to call an onchange event on input fields.

**containerId** <br>
(Required) The **HTML** element were **definedFields** will append to.

**dataStoreFormName** <br>
(Optional) A **Custom Name** of the hidden input field holding<br>the stringyfied json data, if nothing is passed default name <br>will show in **console**

<h3>Adding a custom field</h3>

```javascript
foo.defineField(fieldRefName,HTML)
```
**fieldRefName** <br> is the ref to your field

**HTML** <br> html string passed


<h3>Implementing Inputs in custom field</h3>

```html
<input type="text" dmf_name="name">
```

**dmf_name**<br>
Instead of attribute **name** in input field use **dmf_name**<br>
this is so **WP_dmf** knows what inputs to save to json key:value of defined field type


<h3>Appending Field</h3>
once field is created use

```javascript
addField('definedFieldName')
```
**addField**
will append html to **container** <br> 
and add a record to the dataStore

<h3>Restoring data</h3> and restores state of data

```javascript
foo.restore(data)
```
**data**<br>
Pass **stringify** json<br>



## All Together Now

**HTML**
```html
<div id="clientProps"></div>
<button onclick="wpObject.addField('clientsBasicInfo')">Add Basic Info</button>
```

**javascript**

```javascript
<script>
    customFieldHTML = `
    <div class="clientsBasicInfo">
    <input type="text" dmf_name="name" placeholder="Client Name" >
    <input type="text" dmf_name="age" placeholder="Client Age">
    <input type="text" dmf_name="company" placeholder="Client Company">
    </div>`;

    wpObject = new WP_dmf('wpObject','clientProps','clientData')
    wpObject.defineField('clientsBasicInfo',customFieldHTML)

  </script>
```




## Developer
https://github.com/theoromeo
<br>have any feedback, let me know.
<br>thanks for using WP_dmf



## Upcoming
<li>PHP Companion API</li>
<li>A bit cleaner code </li>

