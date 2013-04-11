/**
 * @version 1.1 $Id$
 * @package Joomla
 * @subpackage EventList
 * @copyright (C) 2005 - 2009 Christoph Lukes
 * @license GNU/GPL 2, see LICENSE.php
 * EventList is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License 2
 * as published by the Free Software Foundation.

 * EventList is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with EventList; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 **/

/**
 * this file manages the js script for adding/removing attachements in event
 */
window.addEvent('domready', function() {	
	
	$$('.attach-field').addEvent('change', addattach);
	
	$$('.attach-remove').addEvent('click', function(event){
		id = event.target.id.substr(13);
		var url = 'index.php?option=com_eventlist&task=ajaxattachremove&format=raw&id='+id;
		var theAjax = new Ajax(url, {
			method: 'post',
			postBody : ''
			});
		
		theAjax.addEvent('onSuccess', function(response) {
			if (response == "1") {
				$(event.target).getParent().getParent().remove();
			}
			//this.venue = eval('(' + response + ')');
		}.bind(this));
		theAjax.request();
	});
});

function addattach()
{
	var tbody = $('el-attachments').getElement('tbody');
	var rows = tbody.getElements('tr');
	var row = rows[rows.length-1].clone();
	row.getElement('.attach-field').addEvent('change', addattach).value = '';
	row.injectInside(tbody);
}