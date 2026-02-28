import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function ExerciseDetail() {
  const { exerciseId } = useParams()
  const navigate = useNavigate()
  const [exercise, setExercise] = useState(null)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Exercise database with YouTube tutorials
  const exerciseDatabase = {
    1: {
      id: 1,
      name: 'Push-ups',
      category: 'chest',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '5 min',
      sets: 3,
      reps: 15,
      description: 'A fundamental upper body exercise that targets chest, shoulders, and triceps while building core stability.',
      benefits: [
        'Builds chest and upper body strength',
        'Improves core stability and balance',
        'Requires no equipment - can do anywhere',
        'Can be modified for all fitness levels',
        'Strengthens multiple muscle groups simultaneously',
        'Improves posture and shoulder health'
      ],
      instructions: [
        'Start in a plank position with hands slightly wider than shoulder-width apart',
        'Keep your body in a straight line from head to heels (no sagging hips)',
        'Lower your body until chest nearly touches the floor (or as low as comfortable)',
        'Push back up to starting position by extending your arms',
        'Keep your core engaged throughout the entire movement',
        'Breathe in on the way down, out on the way up'
      ],
      commonMistakes: [
        'Letting hips sag or rise too high (breaks straight line)',
        'Not going low enough (partial reps limit effectiveness)',
        'Flaring elbows out too wide (can cause shoulder strain)',
        'Holding breath during the movement (reduces endurance)',
        'Moving too fast (control is key for muscle activation)',
        'Dropping head down (keep neck neutral with spine)'
      ],
      modifications: {
        easier: 'Knee push-ups, incline push-ups against wall/bench, or reduced range of motion',
        harder: 'Decline push-ups, weighted push-ups, explosive clap push-ups, or one-arm push-ups'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['chest', 'shoulders', 'triceps', 'core'],
      caloriesPerMinute: 8,
      tips: [
        'Keep your hands directly under your shoulders',
        'Focus on slow, controlled movements',
        'Engage your glutes to maintain hip position',
        'Look slightly forward to keep neck neutral'
      ]
    },
    2: {
      id: 2,
      name: 'Squats',
      category: 'legs',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '6 min',
      sets: 3,
      reps: 20,
      description: 'The king of leg exercises that builds strength and muscle in your lower body while improving mobility.',
      benefits: [
        'Builds leg and glute strength effectively',
        'Improves hip mobility and flexibility',
        'Strengthens core muscles for stability',
        'Functional movement pattern for daily life',
        'Increases bone density in lower body',
        'Boosts athletic performance and power'
      ],
      instructions: [
        'Stand with feet shoulder-width apart, toes pointing slightly outward',
        'Keep your chest up and back straight throughout the movement',
        'Lower your hips back and down as if sitting in a chair',
        'Go as low as comfortable (aim for thighs parallel to floor)',
        'Push through your heels to return to starting position',
        'Squeeze your glutes at the top of the movement'
      ],
      commonMistakes: [
        'Knees caving inward (weak glute activation)',
        'Heels lifting off the floor (weight too far forward)',
        'Rounding the back (poor core engagement)',
        'Not going low enough (limited range of motion)',
        'Leaning too far forward (puts stress on lower back)',
        'Letting knees go past toes (can cause knee strain)'
      ],
      modifications: {
        easier: 'Partial squats, chair squats for support, or holding onto something for balance',
        harder: 'Jump squats, weighted squats, pistol squats, or pause squats at bottom'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves'],
      caloriesPerMinute: 10,
      tips: [
        'Keep your weight in your heels, not toes',
        'Drive your knees outward as you descend',
        'Keep your chest up and shoulders back',
        'Breathe in going down, out coming up'
      ]
    },
    3: {
      id: 3,
      name: 'Dumbbell Curls',
      category: 'biceps',
      difficulty: 'intermediate',
      equipment: 'dumbbells',
      duration: '8 min',
      sets: 3,
      reps: 12,
      description: 'Classic bicep exercise for building arm strength and muscle with proper isolation and control.',
      benefits: [
        'Builds bicep strength and size effectively',
        'Improves grip strength and forearm development',
        'Isolates bicep muscles for targeted growth',
        'Easy to progress with heavier weights',
        'Enhances arm definition and aesthetics',
        'Improves functional pulling strength'
      ],
      instructions: [
        'Stand with feet shoulder-width apart, dumbbells in hands',
        'Keep palms facing forward, elbows close to your sides',
        'Curl the weights up toward your shoulders',
        'Squeeze your biceps at the top of the movement',
        'Lower the weights slowly and with control',
        'Keep your wrists straight and avoid excessive wrist movement'
      ],
      commonMistakes: [
        'Using momentum to swing the weights (reduces effectiveness)',
        'Moving elbows away from body (reduces bicep isolation)',
        'Not fully extending at the bottom (limits range of motion)',
        'Arching the back (poor form, can cause injury)',
        'Dropping weights too quickly (misses eccentric contraction)',
        'Wrist bending (puts stress on joints)'
      ],
      modifications: {
        easier: 'Lighter weights, resistance bands, or preacher curls for support',
        harder: 'Heavier weights, hammer curls, concentration curls, or cheat curls'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['biceps', 'forearms'],
      caloriesPerMinute: 6,
      tips: [
        'Keep your elbows pinned to your sides',
        'Focus on the mind-muscle connection',
        'Control the negative (lowering) phase',
        'Avoid using your back or shoulders'
      ]
    },
    4: {
      id: 4,
      name: 'Plank',
      category: 'core',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '2 min',
      sets: 3,
      reps: '30 sec',
      description: 'Isometric core exercise that builds stability, endurance, and full-body strength through static contraction.',
      benefits: [
        'Strengthens entire core musculature effectively',
        'Improves posture and spinal alignment',
        'Reduces risk of back pain and injury',
        'Enhances overall body stability',
        'Builds mental toughness and focus',
        'Improves balance and coordination'
      ],
      instructions: [
        'Start in a push-up position with hands under shoulders',
        'Lower onto your forearms, elbows directly under shoulders',
        'Keep your body in a straight line from head to heels',
        'Engage your core and glutes throughout the hold',
        'Look at the floor slightly ahead of your hands',
        'Breathe normally and steadily throughout'
      ],
      commonMistakes: [
        'Hips sagging or rising too high (breaks form)',
        'Holding your breath (reduces endurance)',
        'Shoulders shrugging up toward ears (tension)',
        'Looking up or down instead of forward (neck strain)',
        'Arching or rounding the back (poor core engagement)',
        'Not engaging glutes (reduces stability)'
      ],
      modifications: {
        easier: 'Knee plank, incline plank against wall/bench, or shorter hold times',
        harder: 'Weighted plank, plank with leg raises, side planks, or plank jacks'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['core', 'shoulders', 'back'],
      caloriesPerMinute: 5,
      tips: [
        'Squeeze your abs as if bracing for a punch',
        'Keep your neck neutral with your spine',
        'Engage your glutes and thigh muscles',
        'Start with shorter holds and build up gradually'
      ]
    },
    5: {
      id: 5,
      name: 'Bench Press',
      category: 'chest',
      difficulty: 'intermediate',
      equipment: 'barbell',
      duration: '12 min',
      sets: 4,
      reps: 10,
      description: 'Compound upper body exercise for building chest strength and size with proper barbell technique.',
      benefits: [
        'Builds significant chest and upper body strength',
        'Develops triceps and shoulder muscles',
        'Improves pushing strength for daily activities',
        'Allows for progressive overload with weights',
        'Enhances upper body muscle mass',
        'Improves bone density in upper body'
      ],
      instructions: [
        'Lie on bench with eyes under the barbell',
        'Grip bar slightly wider than shoulder-width apart',
        'Unrack bar with straight arms, lower to chest',
        'Touch bar to chest lightly (don\'t bounce)',
        'Push bar up explosively to starting position',
        'Keep your feet flat on floor throughout'
      ],
      commonMistakes: [
        'Bouncing the bar off chest (can cause injury)',
        'Flaring elbows too wide (shoulder strain)',
        'Lifting hips off bench (reduces stability)',
        'Not using full range of motion',
        'Gripping bar too wide or narrow',
        'Arching back excessively'
      ],
      modifications: {
        easier: 'Empty bar, lighter weights, or dumbbell press',
        harder: 'Heavier weights, pause reps, or close-grip bench press'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['chest', 'triceps', 'shoulders'],
      caloriesPerMinute: 9,
      tips: [
        'Keep your shoulder blades pinched together',
        'Maintain a slight arch in your lower back',
        'Control the negative (lowering) phase',
        'Breathe out as you push the bar up'
      ]
    },
    6: {
      id: 6,
      name: 'Rows',
      category: 'back',
      difficulty: 'intermediate',
      equipment: 'dumbbells',
      duration: '10 min',
      sets: 4,
      reps: 12,
      description: 'Essential back exercise that builds pulling strength and improves posture through targeted muscle development.',
      benefits: [
        'Builds strong back muscles effectively',
        'Improves posture and reduces back pain',
        'Balances chest exercises for muscle symmetry',
        'Strengthens grip and forearms',
        'Enhances pulling strength for daily activities',
        'Develops V-taper physique'
      ],
      instructions: [
        'Stand with feet shoulder-width apart, knees slightly bent',
        'Hinge at hips keeping back straight (45-degree angle)',
        'Hold dumbbells with palms facing each other',
        'Pull dumbbells toward your lower chest',
        'Squeeze shoulder blades together at top',
        'Lower weights slowly and with control'
      ],
      commonMistakes: [
        'Rounding the back (risk of injury)',
        'Using momentum instead of muscle',
        'Not pulling high enough (limited range)',
        'Jerking the weights up (poor control)',
        'Standing too upright (reduces back engagement)',
        'Letting shoulders roll forward'
      ],
      modifications: {
        easier: 'Lighter weights, single-arm rows, or supported rows',
        harder: 'Heavier weights, pause reps, or renegade rows'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['back', 'biceps', 'forearms'],
      caloriesPerMinute: 8,
      tips: [
        'Keep your core tight throughout',
        'Focus on pulling with your back, not arms',
        'Squeeze your shoulder blades at the top',
        'Control the negative phase for maximum benefit'
      ]
    },
    7: {
      id: 7,
      name: 'Shoulder Press',
      category: 'shoulders',
      difficulty: 'intermediate',
      equipment: 'dumbbells',
      duration: '8 min',
      sets: 3,
      reps: 10,
      description: 'Fundamental shoulder exercise for building strong, well-developed shoulders and upper body strength.',
      benefits: [
        'Builds shoulder strength and size effectively',
        'Improves upper body pressing power',
        'Enhances shoulder stability and health',
        'Creates balanced shoulder development',
        'Improves overhead lifting ability',
        'Strengthens triceps and upper chest'
      ],
      instructions: [
        'Sit or stand with back straight, core engaged',
        'Hold dumbbells at shoulder height, palms forward',
        'Press weights overhead until arms are fully extended',
        'Don\'t let dumbbells touch at the top',
        'Lower weights slowly to shoulder height',
        'Keep your core tight throughout the movement'
      ],
      commonMistakes: [
        'Arching your back excessively',
        'Not pressing to full extension',
        'Letting elbows flare out too wide',
        'Using momentum instead of muscle',
        'Dropping weights too quickly',
        'Not controlling the negative phase'
      ],
      modifications: {
        easier: 'Lighter weights, seated press, or resistance bands',
        harder: 'Heavier weights, barbell press, or push press'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['shoulders', 'triceps'],
      caloriesPerMinute: 7,
      tips: [
        'Keep your shoulders down away from ears',
        'Squeeze your abs to prevent back arching',
        'Press directly overhead, not forward',
        'Control the weights throughout the movement'
      ]
    },
    8: {
      id: 8,
      name: 'Tricep Dips',
      category: 'triceps',
      difficulty: 'intermediate',
      equipment: 'bodyweight',
      duration: '6 min',
      sets: 3,
      reps: 15,
      description: 'Bodyweight exercise that targets triceps effectively while also engaging chest and shoulders.',
      benefits: [
        'Builds strong, defined triceps',
        'Requires no equipment',
        'Engages multiple muscle groups',
        'Improves upper body pushing strength',
        'Enhances arm definition',
        'Can be modified for all levels'
      ],
      instructions: [
        'Use parallel bars or bench/chair for support',
        'Grip bars with palms facing down, arms straight',
        'Lower your body by bending elbows',
        'Keep elbows close to your sides',
        'Lower until shoulders are level with elbows',
        'Push back up to starting position'
      ],
      commonMistakes: [
        'Flaring elbows out (reduces triceps work)',
        'Not going low enough (limited range)',
        'Using momentum instead of control',
        'Leaning too far forward',
        'Shoulders shrugging up toward ears',
        'Rounding the upper back'
      ],
      modifications: {
        easier: 'Bench dips with bent knees, or partial range of motion',
        harder: 'Weighted dips, straight-leg dips, or ring dips'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['triceps', 'chest', 'shoulders'],
      caloriesPerMinute: 8,
      tips: [
        'Keep your chest up and shoulders back',
        'Focus on using your triceps, not chest',
        'Control the movement, don\'t drop quickly',
        'Keep your core engaged throughout'
      ]
    },
    9: {
      id: 9,
      name: 'Deadlifts',
      category: 'legs',
      difficulty: 'advanced',
      equipment: 'barbell',
      duration: '15 min',
      sets: 4,
      reps: 8,
      description: 'The ultimate full-body exercise that builds incredible strength and muscle mass throughout your entire body.',
      benefits: [
        'Builds total body strength effectively',
        'Develops powerful glutes and hamstrings',
        'Strengthens back and core muscles',
        'Improves posture and reduces back pain',
        'Increases bone density significantly',
        'Enhances athletic performance'
      ],
      instructions: [
        'Stand with feet hip-width apart, bar over mid-foot',
        'Bend at hips and knees, grip bar just outside knees',
        'Keep your back straight, chest up, shoulders back',
        'Drive through heels to lift the bar',
        'Extend hips and knees simultaneously',
        'Lower bar with control, maintaining form'
      ],
      commonMistakes: [
        'Rounding the back (high injury risk)',
        'Using back instead of legs',
        'Not using full range of motion',
        'Jerking the weight off floor',
        'Letting hips rise too fast',
        'Not engaging core properly'
      ],
      modifications: {
        easier: 'Lighter weights, Romanian deadlifts, or trap bar deadlifts',
        harder: 'Heavier weights, deficit deadlifts, or pause reps'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['glutes', 'hamstrings', 'quadriceps', 'back', 'core'],
      caloriesPerMinute: 12,
      tips: [
        'Keep the bar close to your body',
        'Push your hips through at the top',
        'Maintain neutral spine throughout',
        'Breathe in before lifting, out during lift'
      ]
    },
    10: {
      id: 10,
      name: 'Leg Press',
      category: 'legs',
      difficulty: 'intermediate',
      equipment: 'machine',
      duration: '12 min',
      sets: 4,
      reps: 15,
      description: 'Machine exercise that isolates leg muscles for targeted strength building with reduced back strain.',
      benefits: [
        'Builds leg strength without back stress',
        'Allows for heavy weight training safely',
        'Targets quads, glutes, and hamstrings',
        'Easy to learn and perform correctly',
        'Reduces risk of back injury',
        'Great for muscle hypertrophy'
      ],
      instructions: [
        'Sit in machine with back firmly supported',
        'Place feet shoulder-width apart on platform',
        'Release safety handles and grasp side handles',
        'Lower platform by bending knees',
        'Go as low as comfortable without pain',
        'Push platform back up without locking knees'
      ],
      commonMistakes: [
        'Locking knees at top (joint stress)',
        'Not using full range of motion',
        'Arching back off pad',
        'Feet positioned too high or low',
        'Using momentum instead of muscle',
        'Not controlling the negative phase'
      ],
      modifications: {
        easier: 'Lighter weight, single-leg press, or partial range',
        harder: 'Heavier weight, pause reps, or explosive reps'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings'],
      caloriesPerMinute: 10,
      tips: [
        'Keep your lower back pressed against pad',
        'Push through your heels, not toes',
        'Don\'t lock out your knees completely',
        'Control the weight in both directions'
      ]
    },
    11: {
      id: 11,
      name: 'Calf Raises',
      category: 'calves',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '5 min',
      sets: 4,
      reps: 20,
      description: 'Simple yet effective exercise for building strong, defined calf muscles and improving ankle stability.',
      benefits: [
        'Builds strong, defined calf muscles',
        'Improves ankle stability and balance',
        'Enhances jumping ability',
        'Reduces risk of ankle injuries',
        'Improves athletic performance',
        'Can be done anywhere, anytime'
      ],
      instructions: [
        'Stand with feet shoulder-width apart',
        'Rise up onto balls of your feet',
        'Hold for a moment at the top',
        'Lower back down slowly',
        'Keep your core engaged for balance',
        'Use wall for support if needed'
      ],
      commonMistakes: [
        'Not going through full range of motion',
        'Using momentum instead of muscle',
        'Bouncing at the bottom',
        'Not controlling the negative phase',
        'Rolling ankles inward or outward',
        'Not engaging core for stability'
      ],
      modifications: {
        easier: 'Hold onto support, or do fewer reps',
        harder: 'Single-leg raises, weighted raises, or pause reps'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['calves'],
      caloriesPerMinute: 4,
      tips: [
        'Focus on slow, controlled movements',
        'Squeeze calves at the top of movement',
        'Keep your ankles straight, not rolled',
        'Progress gradually with volume and intensity'
      ]
    },
    12: {
      id: 12,
      name: 'Crunches',
      category: 'core',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '8 min',
      sets: 3,
      reps: 25,
      description: 'Classic abdominal exercise that targets the rectus abdominis for core strength and definition.',
      benefits: [
        'Strengthens abdominal muscles effectively',
        'Improves core stability and posture',
        'Requires no equipment',
        'Easy to learn and perform',
        'Builds six-pack abs',
        'Enhances overall core strength'
      ],
      instructions: [
        'Lie on back with knees bent, feet flat',
        'Place hands behind head or across chest',
        'Engage abs to lift shoulders off floor',
        'Keep lower back on the ground',
        'Exhale as you crunch up',
        'Lower slowly and repeat'
      ],
      commonMistakes: [
        'Pulling on neck (strain risk)',
        'Coming up too high (uses hip flexors)',
        'Using momentum instead of abs',
        'Not breathing properly',
        'Arching lower back off ground',
        'Rushing through repetitions'
      ],
      modifications: {
        easier: 'Partial crunches, or fewer reps',
        harder: 'Weighted crunches, decline crunches, or cable crunches'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['core'],
      caloriesPerMinute: 6,
      tips: [
        'Focus on lifting with your abs, not neck',
        'Keep your chin slightly tucked',
        'Breathe out as you crunch up',
        'Quality over quantity for abs'
      ]
    },
    13: {
      id: 13,
      name: 'Pull-ups',
      category: 'back',
      difficulty: 'advanced',
      equipment: 'bodyweight',
      duration: '8 min',
      sets: 3,
      reps: 8,
      description: 'Challenging bodyweight exercise that builds exceptional back and upper body strength through vertical pulling.',
      benefits: [
        'Builds impressive back and bicep strength',
        'Develops V-taper physique',
        'Improves relative body strength',
        'Enhances grip strength significantly',
        'Functional strength for climbing',
        'Impressive display of fitness'
      ],
      instructions: [
        'Grip bar slightly wider than shoulders',
        'Hang with arms fully extended',
        'Engage shoulders and pull with back',
        'Pull chin above bar level',
        'Lower slowly with control',
        'Keep core engaged throughout'
      ],
      commonMistakes: [
        'Not using full range of motion',
        'Using momentum or kipping',
        'Not engaging back muscles',
        'Flaring elbows too wide',
        'Dropping too quickly',
        'Not controlling negative phase'
      ],
      modifications: {
        easier: 'Assisted pull-ups, band-assisted, or negatives only',
        harder: 'Weighted pull-ups, wide grip, or muscle-ups'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['back', 'biceps', 'forearms'],
      caloriesPerMinute: 10,
      tips: [
        'Focus on pulling with your back, not arms',
        'Keep your shoulders down away from ears',
        'Squeeze shoulder blades at the top',
        'Control the negative for maximum benefit'
      ]
    },
    14: {
      id: 14,
      name: 'Lat Pulldowns',
      category: 'back',
      difficulty: 'intermediate',
      equipment: 'machine',
      duration: '10 min',
      sets: 4,
      reps: 12,
      description: 'Machine exercise that isolates back muscles for targeted development with adjustable resistance.',
      benefits: [
        'Builds strong back muscles safely',
        'Adjustable resistance for progression',
        'Isolates lats effectively',
        'Reduces injury risk vs free weights',
        'Great for muscle hypertrophy',
        'Easy to learn proper form'
      ],
      instructions: [
        'Sit with thighs under pads, grip bar wide',
        'Lean back slightly, chest up',
        'Pull bar down to upper chest',
        'Squeeze shoulder blades together',
        'Control the negative phase',
        'Don\'t lean back too far'
      ],
      commonMistakes: [
        'Using body weight to pull',
        'Not pulling low enough',
        'Leaning back too far',
        'Jerking the weight down',
        'Not controlling negative phase',
        'Gripping bar too wide or narrow'
      ],
      modifications: {
        easier: 'Lighter weight, close grip, or assisted machine',
        harder: 'Heavier weight, pause reps, or behind neck'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['back', 'biceps'],
      caloriesPerMinute: 8,
      tips: [
        'Focus on pulling with your elbows',
        'Keep your chest up throughout',
        'Squeeze your back at the bottom',
        'Control the weight in both directions'
      ]
    },
    15: {
      id: 15,
      name: 'Bicep Curls',
      category: 'biceps',
      difficulty: 'beginner',
      equipment: 'dumbbells',
      duration: '8 min',
      sets: 3,
      reps: 15,
      description: 'Fundamental arm exercise for building bicep strength and size with proper isolation and control.',
      benefits: [
        'Builds impressive bicep size',
        'Improves arm strength significantly',
        'Enhances pulling ability',
        'Creates balanced arm development',
        'Improves grip strength',
        'Easy to progress and track'
      ],
      instructions: [
        'Stand with feet shoulder-width apart',
        'Hold dumbbells with palms forward',
        'Keep elbows pinned to your sides',
        'Curl weights up toward shoulders',
        'Squeeze biceps at the top',
        'Lower slowly with control'
      ],
      commonMistakes: [
        'Using momentum to swing weights',
        'Moving elbows away from body',
        'Not fully extending arms',
        'Arching back excessively',
        'Dropping weights too quickly',
        'Wrist bending during movement'
      ],
      modifications: {
        easier: 'Lighter weights, or resistance bands',
        harder: 'Heavier weights, preacher curls, or concentration curls'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['biceps', 'forearms'],
      caloriesPerMinute: 6,
      tips: [
        'Focus on mind-muscle connection',
        'Control both positive and negative phases',
        'Keep your wrists straight',
        'Don\'t use your back or shoulders'
      ]
    },
    16: {
      id: 16,
      name: 'Face Pulls',
      category: 'shoulders',
      difficulty: 'intermediate',
      equipment: 'cable',
      duration: '6 min',
      sets: 3,
      reps: 15,
      description: 'Excellent shoulder exercise that improves posture and strengthens rear delts for balanced shoulder development.',
      benefits: [
        'Improves posture significantly',
        'Strengthens rear delts effectively',
        'Balances shoulder development',
        'Reduces shoulder pain risk',
        'Enhances shoulder health',
        'Great for desk workers'
      ],
      instructions: [
        'Set cable at chest height with rope attachment',
        'Grab rope with palms facing each other',
        'Step back, arms extended in front',
        'Pull rope toward face, elbows high',
        'Separate hands at face level',
        'Return slowly to starting position'
      ],
      commonMistakes: [
        'Not pulling high enough',
        'Using too much weight',
        'Leaning back too far',
        'Not separating hands at face',
        'Rushing the movement',
        'Not controlling negative phase'
      ],
      modifications: {
        easier: 'Lighter weight, or band face pulls',
        harder: 'Heavier weight, pause reps, or single-arm'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['shoulders', 'upper back'],
      caloriesPerMinute: 6,
      tips: [
        'Focus on pulling with your rear delts',
        'Keep your chest up throughout',
        'Squeeze shoulder blades together',
        'Control the movement completely'
      ]
    },
    17: {
      id: 17,
      name: 'Barbell Squats',
      category: 'legs',
      difficulty: 'intermediate',
      equipment: 'barbell',
      duration: '15 min',
      sets: 4,
      reps: 12,
      description: 'The king of leg exercises for building incredible lower body strength and muscle mass with proper barbell technique.',
      benefits: [
        'Builds massive leg strength',
        'Develops powerful glutes and quads',
        'Improves athletic performance',
        'Increases bone density',
        'Enhances hormonal response',
        'Functional strength for daily life'
      ],
      instructions: [
        'Set bar in rack at upper chest height',
        'Step under bar, bar rests on upper back',
        'Grip bar slightly wider than shoulders',
        'Unrack bar and step back',
        'Squat down to parallel or below',
        'Drive up through heels to starting position'
      ],
      commonMistakes: [
        'Not going low enough',
        'Knees caving inward',
        'Heels lifting off floor',
        'Rounding upper back',
        'Leaning too far forward',
        'Not engaging core properly'
      ],
      modifications: {
        easier: 'Lighter weight, box squats, or goblet squats',
        harder: 'Heavier weight, pause squats, or front squats'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves'],
      caloriesPerMinute: 12,
      tips: [
        'Keep your chest up and back straight',
        'Drive your knees outward as you squat',
        'Push through your heels, not toes',
        'Breathe in going down, out coming up'
      ]
    },
    18: {
      id: 18,
      name: 'Lunges',
      category: 'legs',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '8 min',
      sets: 3,
      reps: 10,
      description: 'Functional leg exercise that improves balance, coordination, and unilateral leg strength for athletic performance.',
      benefits: [
        'Improves balance and coordination',
        'Builds unilateral leg strength',
        'Enhances hip flexibility',
        'Functional movement pattern',
        'Improves core stability',
        'Great for athletic performance'
      ],
      instructions: [
        'Stand with feet hip-width apart',
        'Step forward with one leg',
        'Lower hips until both knees at 90 degrees',
        'Keep front knee behind toes',
        'Push back to starting position',
        'Alternate legs or complete all reps one side'
      ],
      commonMistakes: [
        'Front knee going past toes',
        'Not lowering deep enough',
        'Leaning torso too far forward',
        'Back knee touching ground',
        'Taking too short or long steps',
        'Not keeping torso upright'
      ],
      modifications: {
        easier: 'Static lunges, or holding support',
        harder: 'Weighted lunges, walking lunges, or jump lunges'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves'],
      caloriesPerMinute: 8,
      tips: [
        'Keep your torso upright throughout',
        'Step far enough to form 90-degree angles',
        'Focus on controlled movements',
        'Keep your core engaged for balance'
      ]
    },
    19: {
      id: 19,
      name: 'Leg Curls',
      category: 'legs',
      difficulty: 'intermediate',
      equipment: 'machine',
      duration: '10 min',
      sets: 3,
      reps: 15,
      description: 'Isolation exercise that targets hamstrings specifically for balanced leg development and injury prevention.',
      benefits: [
        'Isolates hamstrings effectively',
        'Balances quad development',
        'Reduces knee injury risk',
        'Improves hamstring flexibility',
        'Great for muscle definition',
        'Easy to progress with weight'
      ],
      instructions: [
        'Lie face down on leg curl machine',
        'Position legs under pad, just above heels',
        'Grip handles for stability',
        'Curl legs up toward glutes',
        'Squeeze hamstrings at the top',
        'Lower slowly with control'
      ],
      commonMistakes: [
        'Using momentum instead of muscle',
        'Not using full range of motion',
        'Arching back off pad',
        'Rushing the movement',
        'Not controlling negative phase',
        'Using too much weight'
      ],
      modifications: {
        easier: 'Lighter weight, or single-leg curls',
        harder: 'Heavier weight, pause reps, or slow negatives'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['hamstrings'],
      caloriesPerMinute: 7,
      tips: [
        'Focus on hamstring contraction',
        'Keep your hips pressed into pad',
        'Control the movement completely',
        'Don\'t use your lower back to help'
      ]
    },
    20: {
      id: 20,
      name: 'Glute Bridges',
      category: 'glutes',
      difficulty: 'beginner',
      equipment: 'bodyweight',
      duration: '6 min',
      sets: 3,
      reps: 20,
      description: 'Simple yet effective exercise for activating and strengthening glutes while improving hip mobility.',
      benefits: [
        'Activates glutes effectively',
        'Improves hip mobility',
        'Reduces lower back pain',
        'Enhances athletic performance',
        'Improves posture',
        'Can be done anywhere'
      ],
      instructions: [
        'Lie on back with knees bent, feet flat',
        'Place arms by sides, palms down',
        'Drive through heels to lift hips',
        'Form straight line from knees to shoulders',
        'Squeeze glutes at the top',
        'Lower slowly and repeat'
      ],
      commonMistakes: [
        'Not lifting high enough',
        'Arching lower back excessively',
        'Not engaging glutes properly',
        'Using momentum instead of muscle',
        'Feet positioned too close or far',
        'Not controlling negative phase'
      ],
      modifications: {
        easier: 'Partial range of motion, or fewer reps',
        harder: 'Weighted bridges, single-leg, or pause reps'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['glutes', 'hamstrings'],
      caloriesPerMinute: 6,
      tips: [
        'Focus on squeezing your glutes',
        'Keep your core engaged throughout',
        'Drive through your heels, not toes',
        'Don\'t hyperextend your back at the top'
      ]
    },
    21: {
      id: 21,
      name: 'Incline Press',
      category: 'chest',
      difficulty: 'intermediate',
      equipment: 'dumbbells',
      duration: '12 min',
      sets: 4,
      reps: 12,
      description: 'Upper chest focused exercise that creates balanced chest development and improves pressing strength.',
      benefits: [
        'Targets upper chest effectively',
        'Creates balanced chest development',
        'Improves pressing strength',
        'Reduces shoulder strain vs flat press',
        'Enhances chest aesthetics',
        'Great for muscle definition'
      ],
      instructions: [
        'Set bench to 30-45 degree incline',
        'Lie back with dumbbells at chest level',
        'Press weights up until arms extended',
        'Don\'t let dumbbells touch at top',
        'Lower slowly to chest level',
        'Keep elbows at 45-degree angle'
      ],
      commonMistakes: [
        'Setting incline too high or low',
        'Flaring elbows out too wide',
        'Not using full range of motion',
        'Arching back off bench',
        'Using too much momentum',
        'Not controlling negative phase'
      ],
      modifications: {
        easier: 'Lighter weights, or lower incline',
        harder: 'Heavier weights, pause reps, or barbell press'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['chest', 'shoulders', 'triceps'],
      caloriesPerMinute: 9,
      tips: [
        'Keep your shoulder blades pinched',
        'Focus on upper chest contraction',
        'Control the negative phase',
        'Don\'t let your elbows flare too wide'
      ]
    },
    22: {
      id: 22,
      name: 'Flyes',
      category: 'chest',
      difficulty: 'intermediate',
      equipment: 'dumbbells',
      duration: '8 min',
      sets: 3,
      reps: 15,
      description: 'Isolation chest exercise that stretches and contracts chest muscles for enhanced development and definition.',
      benefits: [
        'Stretches chest muscles effectively',
        'Improves chest definition',
        'Enhances muscle mind-muscle connection',
        'Great for chest pump',
        'Reduces muscle tightness',
        'Improves chest flexibility'
      ],
      instructions: [
        'Lie on back with dumbbells above chest',
        'Palms facing each other, slight elbow bend',
        'Lower weights out to sides in arc motion',
        'Feel stretch in chest at bottom',
        'Bring weights back together above chest',
        'Squeeze chest at the top'
      ],
      commonMistakes: [
        'Bending elbows too much (becomes press)',
        'Not going low enough',
        'Using momentum instead of control',
        'Arching back off bench',
        'Dropping weights too quickly',
        'Not feeling chest stretch'
      ],
      modifications: {
        easier: 'Lighter weights, or machine flyes',
        harder: 'Heavier weights, cable flyes, or pause reps'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['chest'],
      caloriesPerMinute: 7,
      tips: [
        'Keep slight bend in elbows throughout',
        'Focus on chest muscle contraction',
        'Control the movement completely',
        'Don\'t use momentum or body english'
      ]
    },
    23: {
      id: 23,
      name: 'Side Raises',
      category: 'shoulders',
      difficulty: 'beginner',
      equipment: 'dumbbells',
      duration: '6 min',
      sets: 3,
      reps: 12,
      description: 'Isolation exercise that targets side delts for creating wider shoulders and improved shoulder aesthetics.',
      benefits: [
        'Builds side delts effectively',
        'Creates wider shoulder appearance',
        'Improves shoulder health',
        'Enhances upper body aesthetics',
        'Reduces shoulder impingement risk',
        'Easy to learn and perform'
      ],
      instructions: [
        'Stand with feet shoulder-width apart',
        'Hold dumbbells in front of thighs',
        'Keep slight bend in elbows',
        'Raise arms out to sides to shoulder height',
        'Lead with elbows, not hands',
        'Lower slowly and repeat'
      ],
      commonMistakes: [
        'Raising arms too high (shoulder strain)',
        'Using momentum instead of muscle',
        'Not controlling negative phase',
        'Bending elbows too much',
        'Leaning back excessively',
        'Using too much weight'
      ],
      modifications: {
        easier: 'Lighter weights, or resistance bands',
        harder: 'Heavier weights, cable raises, or pause reps'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['shoulders'],
      caloriesPerMinute: 5,
      tips: [
        'Keep your core engaged throughout',
        'Don\'t shrug shoulders toward ears',
        'Focus on side delt contraction',
        'Control the movement completely'
      ]
    },
    24: {
      id: 24,
      name: 'Diamond Push-ups',
      category: 'triceps',
      difficulty: 'intermediate',
      equipment: 'bodyweight',
      duration: '5 min',
      sets: 3,
      reps: 20,
      description: 'Advanced push-up variation that emphasizes triceps development while also engaging chest and shoulders.',
      benefits: [
        'Builds strong triceps effectively',
        'Requires no equipment',
        'Improves pushing strength',
        'Enhances arm definition',
        'Functional bodyweight exercise',
        'Improves core stability'
      ],
      instructions: [
        'Start in push-up position, hands close together',
        'Form diamond shape with thumbs and index fingers',
        'Lower chest toward hands',
        'Keep elbows close to body',
        'Push back up to starting position',
        'Maintain straight body line'
      ],
      commonMistakes: [
        'Flaring elbows out wide',
        'Not going low enough',
        'Hips sagging or rising too high',
        'Using momentum instead of control',
        'Not engaging core properly',
        'Placing hands incorrectly'
      ],
      modifications: {
        easier: 'Knee diamond push-ups, or incline version',
        harder: 'Weighted version, or decline diamond push-ups'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['triceps', 'chest', 'shoulders'],
      caloriesPerMinute: 8,
      tips: [
        'Focus on triceps contraction',
        'Keep your core tight throughout',
        'Control the movement completely',
        'Don\'t let your hips sag'
      ]
    },
    25: {
      id: 25,
      name: 'Light Cardio',
      category: 'cardio',
      difficulty: 'beginner',
      equipment: 'treadmill',
      duration: '30 min',
      sets: 1,
      reps: '30 min',
      description: 'Low-intensity cardiovascular exercise that improves heart health and endurance without excessive stress.',
      benefits: [
        'Improves cardiovascular health',
        'Enhances endurance significantly',
        'Reduces stress and anxiety',
        'Burns calories effectively',
        'Improves mood and energy',
        'Great for active recovery'
      ],
      instructions: [
        'Start with 5-minute warm-up walk',
        'Increase to comfortable jogging pace',
        'Maintain steady pace for 20 minutes',
        'Stay at 60-70% max heart rate',
        'Focus on steady breathing',
        'Cool down with 5-minute walk'
      ],
      commonMistakes: [
        'Starting too fast',
        'Not warming up properly',
        'Poor running form',
        'Holding onto treadmill rails',
        'Not staying hydrated',
        'Ignoring body signals'
      ],
      modifications: {
        easier: 'Walking only, or shorter duration',
        harder: 'Higher intensity, or interval training'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['cardio'],
      caloriesPerMinute: 10,
      tips: [
        'Maintain good posture throughout',
        'Stay hydrated before, during, after',
        'Listen to your body',
        'Focus on steady breathing'
      ]
    },
    26: {
      id: 26,
      name: 'Stretching',
      category: 'flexibility',
      difficulty: 'beginner',
      equipment: 'none',
      duration: '15 min',
      sets: 1,
      reps: '15 min',
      description: 'Essential flexibility work that improves range of motion, reduces injury risk, and enhances recovery.',
      benefits: [
        'Improves flexibility significantly',
        'Reduces injury risk',
        'Enhances muscle recovery',
        'Reduces muscle soreness',
        'Improves posture',
        'Promotes relaxation'
      ],
      instructions: [
        'Start with gentle warm-up movements',
        'Hold each stretch 15-30 seconds',
        'Don\'t bounce, hold steady stretches',
        'Breathe deeply throughout',
        'Stretch all major muscle groups',
        'Never stretch to pain point'
      ],
      commonMistakes: [
        'Bouncing during stretches',
        'Holding breath while stretching',
        'Stretching cold muscles',
        'Pushing to pain point',
        'Rushing through stretches',
        'Not warming up first'
      ],
      modifications: {
        easier: 'Shorter hold times, or fewer stretches',
        harder: 'Longer holds, or advanced stretches'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['flexibility'],
      caloriesPerMinute: 3,
      tips: [
        'Be consistent with stretching',
        'Focus on tight areas',
        'Stay relaxed while stretching',
        'Make it a daily habit'
      ]
    },
    27: {
      id: 27,
      name: 'Core Work',
      category: 'core',
      difficulty: 'intermediate',
      equipment: 'bodyweight',
      duration: '10 min',
      sets: 3,
      reps: '20',
      description: 'Comprehensive core training that strengthens all abdominal muscles for improved stability and aesthetics.',
      benefits: [
        'Strengthens entire core effectively',
        'Improves posture and stability',
        'Reduces back pain risk',
        'Enhances athletic performance',
        'Creates defined abs',
        'Functional strength for daily life'
      ],
      instructions: [
        'Include variety of core exercises',
        'Focus on proper form over speed',
        'Engage all core muscles',
        'Breathe properly throughout',
        'Progress gradually',
        'Stay consistent'
      ],
      commonMistakes: [
        'Only doing crunches',
        'Poor form on exercises',
        'Holding breath during movements',
        'Not engaging all core muscles',
        'Progressing too quickly',
        'Inconsistent training'
      ],
      modifications: {
        easier: 'Fewer exercises, or shorter duration',
        harder: 'More exercises, or longer duration'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['core'],
      caloriesPerMinute: 7,
      tips: [
        'Focus on quality over quantity',
        'Include different core movements',
        'Stay consistent with training',
        'Listen to your body'
      ]
    },
    28: {
      id: 28,
      name: 'Foam Rolling',
      category: 'recovery',
      difficulty: 'beginner',
      equipment: 'foam roller',
      duration: '10 min',
      sets: 1,
      reps: '10 min',
      description: 'Self-myofascial release technique that reduces muscle tension, improves recovery, and enhances flexibility.',
      benefits: [
        'Reduces muscle soreness',
        'Improves flexibility',
        'Enhances recovery speed',
        'Reduces injury risk',
        'Improves blood flow',
        'Cost-effective recovery tool'
      ],
      instructions: [
        'Start with larger muscle groups',
        'Roll slowly over muscle tissue',
        'Pause on tender spots for 20-30 seconds',
        'Avoid joints and bones',
        'Breathe deeply throughout',
        'Stay hydrated'
      ],
      commonMistakes: [
        'Rolling too quickly',
        'Rolling over joints/bones',
        'Spending too little time on areas',
        'Using excessive pressure',
        'Not breathing properly',
        'Rolling injured areas'
      ],
      modifications: {
        easier: 'Softer foam roller, or shorter duration',
        harder: 'Firm roller, or longer duration'
      },
      youtubeUrl: 'https://www.youtube.com/embed/egHZ3bRMgYQ',
      muscleGroups: ['recovery'],
      caloriesPerMinute: 4,
      tips: [
        'Be consistent with foam rolling',
        'Focus on tight areas',
        'Don\'t roll over joints',
        'Stay hydrated before and after'
      ]
    }
  }

  useEffect(() => {
    // Simulate loading exercise data
    setTimeout(() => {
      const exerciseData = exerciseDatabase[exerciseId]
      if (exerciseData) {
        setExercise(exerciseData)
        // Check if exercise is completed from localStorage
        const completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '{}')
        setCompleted(completedExercises[exerciseId] || false)
      }
      setLoading(false)
    }, 500)
  }, [exerciseId])

  const handleComplete = () => {
    setCompleted(!completed)
    const completedExercises = JSON.parse(localStorage.getItem('completedExercises') || '{}')
    completedExercises[exerciseId] = !completed
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading exercise details...</p>
        </div>
      </div>
    )
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercise Not Found</h2>
          <Link to="/workouts" className="text-orange-600 hover:text-orange-700">
            Back to Workouts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/workouts')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{exercise.name}</h1>
                <p className="text-gray-600 capitalize">{exercise.category} • {exercise.difficulty}</p>
              </div>
            </div>
            <button
              onClick={handleComplete}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                completed 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
            >
              {completed ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Completed
                </span>
              ) : (
                'Mark Complete'
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={exercise.youtubeUrl}
                  title={`${exercise.name} Tutorial`}
                  className="w-full h-96"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Video Tutorial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{exercise.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{exercise.sets} × {exercise.reps}</span>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{exercise.description}</p>
              </div>
            </section>

            {/* Instructions */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">How to Perform</h2>
              <ol className="space-y-3">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{instruction}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Common Mistakes */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
              <div className="space-y-3">
                {exercise.commonMistakes.map((mistake, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{mistake}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exercise Info */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Exercise Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Equipment</p>
                  <p className="font-medium text-gray-900 capitalize">{exercise.equipment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Difficulty</p>
                  <p className="font-medium text-gray-900 capitalize">{exercise.difficulty}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Calories/Min</p>
                  <p className="font-medium text-gray-900">{exercise.caloriesPerMinute} cal</p>
                </div>
              </div>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits</h3>
              <ul className="space-y-2">
                {exercise.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Muscle Groups */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Muscle Groups</h3>
              <div className="flex flex-wrap gap-2">
                {exercise.muscleGroups.map((muscle, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                    {muscle}
                  </span>
                ))}
              </div>
            </section>

            {/* Modifications */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Modifications</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-1">Easier</p>
                  <p className="text-gray-700 text-sm">{exercise.modifications.easier}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600 mb-1">Harder</p>
                  <p className="text-gray-700 text-sm">{exercise.modifications.harder}</p>
                </div>
              </div>
            </section>

            {/* Pro Tips */}
            {exercise.tips && (
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pro Tips</h3>
                <ul className="space-y-2">
                  {exercise.tips.map((tip, index) => (
                    <li key={index} className="flex gap-2">
                      <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ExerciseDetail
