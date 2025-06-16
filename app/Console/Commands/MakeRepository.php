<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name} {--model=} {--extends=CrudRepository}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');
        $model = $this->option('model');
        $parent = $this->option('extends');

        $folder = app_path('Repositories/');
        $filePath = $folder . $name . '.php';

        if(!file_exists($folder)) mkdir($folder, 0755, true);

        $content = <<<PHP
        <?php

        namespace App\Repositories;

        use App\Models\\$model;

        class {$name} extends {$parent} {

            public function __construct() {
                \$this->model = new {$model};
            }
        }
        PHP;

        file_put_contents($filePath, $content);
    }
}
