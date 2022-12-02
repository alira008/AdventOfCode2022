fn read_list(file: &str) -> Result<Vec<String>, String> {
    let inventory: Vec<String> = match std::fs::read_to_string(file) {
        Ok(i) => i.split("\n").map(|item| String::from(item)).collect(),
        Err(e) => return Err(e.to_string()),
    };

    Ok(inventory)
}

fn puzzle_one() {
    let mut current_elf_calories = 0;

    let inventory: Vec<i32> = match read_list("list-two.txt") {
        Ok(i) => i.iter().map(|s| s.parse::<i32>().unwrap_or(0)).collect(),
        Err(e) => panic!("{:#?}", e),
    };

    let mut flattened_inventory = Vec::new();

    for (elf_number, item) in inventory.iter().enumerate() {
        let calorie = item.clone();
        current_elf_calories += calorie;

        if calorie == 0 || elf_number == inventory.len() - 1 {
            flattened_inventory.push(current_elf_calories);
            current_elf_calories = 0;
        }
    }

    let highest_calories = match flattened_inventory.iter().max() {
        Some(v) => v.clone(),
        None => 0,
    };

    println!(
        "Highest amount of calories an elf is carrying is {}",
        highest_calories
    );
}

fn puzzle_two() {
    let mut current_elf_calories = 0;

    let inventory: Vec<i32> = match read_list("list-two.txt") {
        Ok(i) => i.iter().map(|s| s.parse::<i32>().unwrap_or(0)).collect(),
        Err(e) => panic!("{:#?}", e),
    };

    let mut flattened_inventory = Vec::new();

    for (elf_number, item) in inventory.iter().enumerate() {
        let calorie = item.clone();
        current_elf_calories += calorie;

        if calorie == 0 || elf_number == inventory.len() - 1 {
            flattened_inventory.push(current_elf_calories);
            current_elf_calories = 0;
        }
    }

    flattened_inventory.sort_by(|a, b| b.cmp(a));
    let total_top_three_calories: i32 = flattened_inventory[0..3].to_vec().iter().sum();

    println!("Total of top three {}", total_top_three_calories);
}

fn main() {
    puzzle_one();

    puzzle_two();
}
