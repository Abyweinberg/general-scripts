<?php
$json_url = /*Url*/ 
$json_obj = json_decode(file_get_contents($json_url), true);

$items_to_list = array();
$menu_list_ordered = array();

foreach ($json_obj as $value) {
	$items_to_list[$value['id']] = $value;
}
// Sort by key (id).
ksort($items_to_list);

// Search for items to be sorted 
foreach ($items_to_list as $items_to_list_key => $items_to_list_value) {
	// In this case, the value not have parent, we push it in the variable "menu list ordered"
	// LEVEL 0 //
	if ($items_to_list_value['parent_id'] == 0) {
		array_push($menu_list_ordered, $items_to_list_value);
		continue;
	}
	// If the value have perent_id(parent_id > 0) we search for the parent and push it in a new field called "children"
	// We search in the menu_list_ordered and compare the ID with the parend_id
	// LEVEL 1 //
	foreach ($menu_list_ordered as $menu_list_ordered_key => &$menu_list_ordered_value) {
		// Check match with the already ordered list item (parent) with the new item to be sorted "parent_id"
		if ($menu_list_ordered_value['id'] == $items_to_list_value['parent_id']) {
			// Check if already have 'children' field if not we create one
			if (isset($menu_list_ordered_value['children'])) {
				array_push($menu_list_ordered_value['children'], $items_to_list_value);
				break;
			} else {
				$menu_list_ordered_value['children'] = array($items_to_list_value);
				break;
			}
		}
		// LEVEL 2 //
		// If there isn't match I search for list children ids if is set.
		if (isset($menu_list_ordered_value['children'])) {
			foreach ($menu_list_ordered_value['children'] as $key => &$menu_list_ordered_children_value) {
				if ($menu_list_ordered_children_value['id'] == $items_to_list_value['parent_id']) {
					if (isset($menu_list_ordered_children_value['children'])) {
						array_push($menu_list_ordered_children_value['children'], $items_to_list_value);
						break;
					} else {
						$menu_list_ordered_children_value['children'] = array($items_to_list_value);
						break;
					}
				}
			}
		}
	}
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Exersices PHP</title>
</head>
<body>
<ul>
<?php foreach ($menu_list_ordered as $key => $first_level_value): ?>
	<li><?= $first_level_value['name'] ?></li>
		<?php if (isset($first_level_value['children'])): ?>
			<ul>
				<?php foreach ($first_level_value['children'] as $key => $second_level_value): ?>
				<li><?= $second_level_value['name'] ?></li>
					<?php if (isset($second_level_value['children'])): ?>
						<?php foreach ($second_level_value['children'] as $key => $third_level_value): ?>
					<ul>
					<li><?= $third_level_value['name'] ?></li>
					</ul>
						<?php endforeach; ?>			
					<?php endif; ?>
					<?php endforeach; ?>
			</ul>
		<?php endif; ?>
<?php endforeach; ?>
</ul>
</body>
