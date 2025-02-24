using System;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Choose an option:");
        Console.WriteLine("1. Non-Generic Collections");
        Console.WriteLine("2. Generic Collections");
        Console.Write("Enter your choice (1 or 2): ");
        
        int choice = int.Parse(Console.ReadLine());

        if (choice == 1)
        {
            NonGenericDemo.Run();
        }
        else if (choice == 2)
        {
            GenericDemo.Run();
        }
        else
        {
            Console.WriteLine("Invalid choice! Exiting...");
        }
    }
}

using System;
using System.Collections;

public class NonGenericDemo
{
    public static void Run()
    {
        Console.WriteLine("\n--- Non-Generic Collections Demo ---");

        // 1. ArrayList Example
        ArrayList arrayList = new ArrayList();
        arrayList.Add("Car");
        arrayList.Add(42);
        arrayList.Add(true);

        Console.WriteLine("\nArrayList Items:");
        foreach (var item in arrayList)
        {
            Console.WriteLine(item);
        }

        // 2. Hashtable Example
        Hashtable hashtable = new Hashtable();
        hashtable["ID"] = 101;
        hashtable["Name"] = "John Doe";
        hashtable["Age"] = 25;

        Console.WriteLine("\nHashtable Items:");
        foreach (DictionaryEntry item in hashtable)
        {
            Console.WriteLine($"{item.Key}: {item.Value}");
        }

        // 3. Stack (LIFO)
        Stack stack = new Stack();
        stack.Push("First");
        stack.Push("Second");
        stack.Push("Third");

        Console.WriteLine("\nStack Items (LIFO):");
        while (stack.Count > 0)
        {
            Console.WriteLine(stack.Pop());
        }

        // 4. Queue (FIFO)
        Queue queue = new Queue();
        queue.Enqueue("One");
        queue.Enqueue("Two");
        queue.Enqueue("Three");

        Console.WriteLine("\nQueue Items (FIFO):");
        while (queue.Count > 0)
        {
            Console.WriteLine(queue.Dequeue());
        }
    }
}

using System;
using System.Collections.Generic;

public class GenericDemo
{
    public static void Run()
    {
        Console.WriteLine("\n--- Generic Collections Demo ---");

        // 1. List<T> Example
        List<string> carBrands = new List<string>();
        carBrands.Add("Toyota");
        carBrands.Add("BMW");
        carBrands.Add("Tesla");

        Console.WriteLine("\nList<T> Items:");
        foreach (var brand in carBrands)
        {
            Console.WriteLine(brand);
        }

        // 2. Dictionary<TKey, TValue> Example
        Dictionary<int, string> employees = new Dictionary<int, string>();
        employees[101] = "Alice";
        employees[102] = "Bob";
        employees[103] = "Charlie";

        Console.WriteLine("\nDictionary<TKey, TValue> Items:");
        foreach (var kvp in employees)
        {
            Console.WriteLine($"ID: {kvp.Key}, Name: {kvp.Value}");
        }

        // 3. Stack<T> Example
        Stack<string> stack = new Stack<string>();
        stack.Push("First");
        stack.Push("Second");
        stack.Push("Third");

        Console.WriteLine("\nStack<T> Items (LIFO):");
        while (stack.Count > 0)
        {
            Console.WriteLine(stack.Pop());
        }

        // 4. Queue<T> Example
        Queue<int> queue = new Queue<int>();
        queue.Enqueue(1);
        queue.Enqueue(2);
        queue.Enqueue(3);

        Console.WriteLine("\nQueue<T> Items (FIFO):");
        while (queue.Count > 0)
        {
            Console.WriteLine(queue.Dequeue());
        }

        // 5. HashSet<T> Example
        HashSet<int> uniqueNumbers = new HashSet<int>();
        uniqueNumbers.Add(10);
        uniqueNumbers.Add(20);
        uniqueNumbers.Add(30);
        uniqueNumbers.Add(20); // Duplicate won't be added

        Console.WriteLine("\nHashSet<T> Items (Unique Elements Only):");
        foreach (var number in uniqueNumbers)
        {
            Console.WriteLine(number);
        }
    }
}
